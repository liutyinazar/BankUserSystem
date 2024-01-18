from django.contrib import admin
from .models import Bank, BankUser, UserBankRelationship

admin.site.register(Bank)
admin.site.register(BankUser)
admin.site.register(UserBankRelationship)
