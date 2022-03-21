from unicodedata import category
from django.db import models

# Create your models here.

class Box_Plan(models.Model):
    category = models.CharField(max_length=30)
    sub_category = models.CharField(max_length=30)
    annual_price = models.IntegerField()
    price_per_box = models.IntegerField()
    contents = models.CharField(max_length=250)

class Self_Teach_Plan(models.Model):
    category = models.CharField(max_length=30)
    sub_category = models.CharField(max_length=30)
    annual_price = models.IntegerField()
    price_per_month = models.IntegerField()

class Total_Beginner_Package(models.Model):
    category = models.CharField(max_length=30)
    sub_category = models.CharField(max_length=30)
    price = models.IntegerField()
    contents = models.CharField(max_length=250)

