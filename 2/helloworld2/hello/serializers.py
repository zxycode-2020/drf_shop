from django.contrib.auth.models import User,Group

from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields=('id','url','username','email','first_name',)


class GroupSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model=Group
		fields=('id','url','name','user_set',)