from django.contrib import admin
from django.urls import path
from api.views import (
    UserView,
    UserCreateView,
    UserDestroyView,
    UserUpdateView,
    BankView,
    BankCreateView,
    BankDestroyView,
    BankRetrieveView,
    BankUpdateView,
    
)

urlpatterns = [
    path("admin/", admin.site.urls),
    # BANKS
    path("api/v1/banks/", BankView.as_view()),
    path("api/v1/banks/create/", BankCreateView.as_view()),
    path("api/v1/banks/<int:pk>/", BankRetrieveView.as_view()),
    path("api/v1/banks/<int:pk>/update/", BankUpdateView.as_view()),
    path("api/v1/banks/<int:pk>/delete/", BankDestroyView.as_view()),
    # USERS
    path("api/v1/users/", UserView.as_view()),
    path("api/v1/users/create/", UserCreateView.as_view()),
    path("api/v1/users/<int:pk>/update/", UserUpdateView.as_view()),
    path("api/v1/users/<int:pk>/delete/", UserDestroyView.as_view()),
]
