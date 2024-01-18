from rest_framework import serializers
from .models import Bank, BankUser


class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankUser
        fields = ["id", "password", "first_name", "last_name", "username", "email"]
