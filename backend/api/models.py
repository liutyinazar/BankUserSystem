from django.db import models


class Bank(models.Model):
    bank_name = models.CharField(max_length=100)
    routing_number = models.CharField(max_length=100)
    swift_bic = models.CharField(max_length=100)

    def __str__(self):
        return self.bank_name


class BankUser(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.EmailField()

    banks = models.ManyToManyField(Bank, through='UserBankRelationship')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class UserBankRelationship(models.Model):
    user = models.ForeignKey(BankUser, on_delete=models.CASCADE)
    bank = models.ForeignKey(Bank, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user} {self.bank}"
