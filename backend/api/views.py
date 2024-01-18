import os
import requests
from dotenv import load_dotenv
from .models import Bank, BankUser
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import BankSerializer, UserSerializer

load_dotenv()

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
