from rest_framework import serializers
from django.contrib.auth.models import User
from computerapp.models import Product,Manufacturer,Category,UserProfile,DeliveryAddress,Order

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserProfile
        fields=('id','user','mobile_phone','nickname','description','icon','created','updated',)
        read_only_fields=('user',)




class UserInfoSerializer(serializers.ModelSerializer):
    profile_of=UserProfileSerializer()
    class Meta:
        model=User
        fields=('id','username','email','first_name','last_name','date_joined','profile_of',)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('id','username','password','email','first_name','last_name',)
        extra_kwargs={'password':{'write_only':True}}
    def create(self, validated_data):
        user=User(**validated_data)#接受前端传过来的用户名和密码
        user.set_password(validated_data['password'])#通过字典方式调用
        user.save()#保存到内存中
        user_profile=UserProfile(user=user)
        user_profile.save()
        return user

class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Manufacturer
        fields=('id','name',)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields=('id','name',)



class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=('id','model','image','price','sold','category','manufacturer',)


class ProductRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=('id','model','image','price','sold','category','manufacturer','description','created','updated',)


class DeliveryAddressSerilizer(serializers.ModelSerializer):
    '''收货地址'''
    class Meta:
        model=DeliveryAddress
        fields=('id','user','contact_person','contact_mobile_phone','delivery_address','created','updated',)
        read_only_fields = ('user',)


class OrderListSerializer(serializers.ModelSerializer):
    product = ProductListSerializer()
    address = DeliveryAddressSerilizer()
    class Meta:
        model=Order
        fields=('id','status','user','product','price','quantity','remark','address','created','updated',)


class OrderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'status', 'user', 'product', 'price', 'quantity', 'remark', 'address', 'created', 'updated',)
        read_only_fields=('user','price','address',)