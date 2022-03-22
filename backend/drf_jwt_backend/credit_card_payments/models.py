from django.db import models
from customers.models import Customer

# Create your models here.

class Credit_Card_Payment(models.Model):
    customer = models.ForeignKey(Customer, blank=True, null=True, on_delete=models.CASCADE)
    cc_type = models.CharField(max_length=30)
    cc_number = models.IntegerField(max_length=16)
    cc_exp_date = models.CharField(max_length=5)
    cc_cvv = models.IntegerField(max_length=3)
    cc_full_name = models.CharField(max_length=30)
    is_valid = models.BooleanField()