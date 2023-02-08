from djoser.serializers import UserCreateSerializer
from rest_framework.serializers import CharField
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Review, Order

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', "username", 'password', 'image', "is_staff")

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"