from django.shortcuts import render
import logging
import datetime
import json

LOG_FILENAME = 'shop.log'

#logging.basicConfig(filename=LOG_FILENAME,level = logging.DEBUG)
logging.basicConfig(filename=LOG_FILENAME,level=logging.INFO)

from rest_framework import generics
from rest_framework import permissions
from rest_framework.filters import OrderingFilter,SearchFilter
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

from computerapp.serializers import ProductListSerializer,ProductRetrieveSerializer,UserInfoSerializer,UserProfileSerializer,UserSerializer,DeliveryAddressSerilizer,OrderListSerializer,OrderCreateSerializer
from computerapp.models import Product,UserProfile,DeliveryAddress,Order


# Create your views here.
class ProductListView(generics.ListAPIView):
    '''产品列表'''
    queryset=Product.objects.all()
    serializer_class=ProductListSerializer
    permissin_classes=(permissions.AllowAny,)
    filter_backends = (OrderingFilter,SearchFilter)
    ordering_fields=('category','manufacturer','created','sold',)
    search_fields=('description','model')
    ordering=('id',)
    pagination_class = LimitOffsetPagination


class ProductListByCategoryView(generics.ListAPIView):
    '''产品类别列表'''
    serializer_class=ProductListSerializer
    permissin_classes=(permissions.AllowAny,)
    filter_backends = (OrderingFilter,SearchFilter)
    ordering_fields=('category','manufacturer','created','sold','stock','price',)
    search_fields=('description',)
    ordering=('id',)

    def get_queryset(self):
        category=self.request.query_params.get('category',None)

        if category is not None:
            queryset = Product.objects.filter(category=category)
        else:
            queryset=Product.objects.all()

        return queryset


class ProductListByCategoryManufacturerView(generics.ListAPIView):
    '''产品按类别品牌列表'''
    serializer_class=ProductListSerializer
    permissin_classes=(permissions.AllowAny,)
    filter_backends = (OrderingFilter,SearchFilter)
    ordering_fields=('category','manufacturer','created','sold','stock','price',)
    search_fields=('description',)
    ordering=('id',)

    def get_queryset(self):
        category=self.request.query_params.get('category',None)
        manufacturer = self.request.query_params.get('manufacturer', None)

        if category is not None:
            queryset = Product.objects.filter(category=category,manufacturer=manufacturer)
        else:
            queryset=Product.objects.all()

        return queryset


class ProductRetrieveView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductRetrieveSerializer
    permission_classes = (permissions.AllowAny,)


class UserInfoView(APIView):
    '''用户基本信息'''
    permission_classes=(permissions.IsAuthenticated,)
    def get(self,request,format=None):
        user=self.request.user
        serializer=UserInfoSerializer(user)
        return Response(serializer.data)

class UserProfileRUView(generics.RetrieveUpdateAPIView):
    '''用户其他信息'''
    serializer_class = UserProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        user = self.request.user
        obj =UserProfile.objects.get(user=user)
        return obj


class UserCreateView(generics.CreateAPIView):
    '''用户创建'''
    serializer_class = UserSerializer


class DeliveryAddressLCView(generics.ListCreateAPIView):
    '''收货地址LC'''
    serializer_class = DeliveryAddressSerilizer
    permission_classes = (permissions.IsAuthenticated,)
    def get_queryset(self):
        user = self.request.user
        queryset= DeliveryAddress.objects.filter(user=user)
        return queryset

    def perform_create(self, serializer):
        user=self.request.user
        s=serializer.save(user=user)
        profile=user.profile_of
        profile.delivery_address=s
        profile.save()


class DeliveryAddressRUDView(generics.RetrieveUpdateDestroyAPIView):
    '''收货地址RUD'''
    serializer_class = DeliveryAddressSerilizer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        user = self.request.user
        # obj =DeliveryAddress.objects.get(user=user)
        try:
            obj=DeliveryAddress.objects.get(id=self.kwargs['pk'],user=user)
        except Exception as e:
            raise NotFound('no found')
        return obj


class CartListView(generics.ListAPIView):
    '''购物车列表'''
    serializer_class=OrderListSerializer
    permissin_classes=(permissions.IsAuthenticated,)

    def get_queryset(self):
       user=self.request.user
       queryset=Order.objects.filter(user=user,status='0')
       return queryset


class OrderListView(generics.ListAPIView):
    '''订单列表'''
    serializer_class=OrderListSerializer
    permissin_classes=(permissions.IsAuthenticated,)

    def get_queryset(self):
       user=self.request.user
       queryset=Order.objects.filter(user=user,status__in=['1','2','3','4'])
       return queryset


class OrderCreateView(generics.CreateAPIView):
    '''创建订单'''
    queryset = Order.objects.all()
    serializer_class = OrderCreateSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        user = self.request.user
        product=serializer.validated_data.get('product')
        serializer.save(user=user,price=product.price,address=user.profile_of.delivery_address,status='0',)

        logging.info('user %d cart changed,product %d related.Time is %s.', user.id, product.id, str(datetime.datetime.now()))


# class OrderRUDView(generics.RetrieveUpdateDestroyAPIView):
#     '''Order'''
#     serializer_class = OrderRUDSerializer
#     permission_classes = (permissions.IsAuthenticated,)
#
#     def get_object(self):
#         user = self.request.user
#         obj= Order.objects.get(user=user,id=self.kwargs['pk'])
#         return obj
#
#     def perform_update(self, serializer):
#         user = self.request.user
#         serializer.save(user=user,sttus='1')