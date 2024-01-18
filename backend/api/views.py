import os
import requests
from .models import Bank, BankUser
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import BankSerializer, UserSerializer



class BankView(generics.ListAPIView):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer

class BankCreateView(APIView):
    def post(self, request, *args, **kwargs):
        data_url = f'{os.getenv("RANDOM_DATA_URL")}/banks'
        response = requests.get(data_url)
        
        if response.status_code == 200:
            data = response.json()
            serializer = BankSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Unable to fetch data from external URL"}, status=response.status_code)

class BankRetrieveView(generics.RetrieveAPIView):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer


class BankUpdateView(generics.UpdateAPIView):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer


class BankDestroyView(generics.DestroyAPIView):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer

    def perform_destroy(self, instance):
        if instance.userbankrelationship_set.exists():
            return Response({"error": "Cannot delete a bank with associated users"}, status=status.HTTP_400_BAD_REQUEST)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserView(generics.ListAPIView):
    queryset = BankUser.objects.all()
    serializer_class = UserSerializer

class UserCreateView(APIView):
    def post(self, request, *args, **kwargs):
        data_url = f'{os.getenv("RANDOM_DATA_URL")}/users'
        response = requests.get(data_url)
        
        if response.status_code == 200:
            data = response.json()
            serializer = UserSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Unable to fetch data from external URL"}, status=response.status_code)

class UserRetrieveView(generics.RetrieveAPIView):
    queryset = BankUser.objects.all()
    serializer_class = UserSerializer


class UserUpdateView(generics.UpdateAPIView):
    queryset = BankUser.objects.all()
    serializer_class = UserSerializer


class UserDestroyView(generics.DestroyAPIView):
    queryset = BankUser.objects.all()
    serializer_class = UserSerializer

class UsersInBankView(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        bank_id = self.kwargs['bank_id']
        queryset = BankUser.objects.filter(banks__id=bank_id)
        return queryset