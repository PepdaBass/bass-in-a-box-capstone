from django.db import models
from customers.models import Customer
from shipping.models import Shipping
from credit_card_payments.models import Credit_Card_Payment

# Create your models here.

class Bill(models.Model):
    customer = models.ForeignKey(Customer, blank=True, null=True, on_delete=models.CASCADE)
    shipping = models.ForeignKey(Shipping, blank=True, null=True, on_delete=models.CASCADE)
    credit_card_payment = models.ForeignKey(Credit_Card_Payment, blank=True, null=True, on_delete=models.CASCADE)
    total_amount = models.IntegerField()
    is_paid = models.BooleanField(blank=False, null=False)
