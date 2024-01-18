from rest_framework import serializers
from .models import Bank, BankUser, UserBankRelationship

class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankUser
        fields = ["id", "password", "first_name", "last_name", "username", "email"]


class UserBankRelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBankRelationship
        fields = "__all__"
