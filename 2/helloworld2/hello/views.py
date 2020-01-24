from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User,Group
from rest_framework import viewsets
from hello.serializers import UserSerializer,GroupSerializer


class UserViewSet(viewsets.ModelViewSet):
    '''查看、编辑用户数据的API接口'''
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
  '''查看、编辑用户数据的API接口'''
  queryset=Group.objects.all()
  serializer_class=GroupSerializer