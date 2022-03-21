from django.db import models
from customers.models import Customer
from box_plans.models import Box_Plan, Total_Beginner_Package


# Create your models here.

class Shipping(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    box_plan = models.ForeignKey(Box_Plan, on_delete=models.CASCADE)
    total_beginner_package = models.ForeignKey(Total_Beginner_Package, on_delete=models.CASCADE)
    shipping_type = models.CharField(max_length=30)
    shipping_company = models.CharField(max_length=30)
    shipping_cost = models.IntegerField()