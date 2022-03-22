from django.db import models
from django.contrib.auth.models import User
from box_plans.models import Box_Plan, Self_Teach_Plan, Total_Beginner_Package

# Create your models here.

class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    box_plan = models.ForeignKey(Box_Plan, blank=True, null=True, on_delete=models.CASCADE)
    self_teach_plan = models.ForeignKey(Self_Teach_Plan, blank=True, null=True, on_delete=models.CASCADE)
    total_beginner_package = models.ForeignKey(Total_Beginner_Package, blank=True, null=True, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    street_address = models.CharField(max_length=50)
    city = models.CharField(max_length=30)
    state = models.CharField(max_length=30)
    zip_code = models.CharField(max_length=10)
    country = models.CharField(max_length=30)
    telephone = models.CharField(max_length=20)
    box_is_purchased = models.BooleanField(default=False)
    teach_yourself_is_purchased = models.BooleanField(default=False)
    total_beginner_is_purchased = models.BooleanField(default=False)
