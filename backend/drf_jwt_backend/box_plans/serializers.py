from rest_framework import serializers
from .models import Box_Plan, Self_Teach_Plan, Total_Beginner_Package

class Box_Plan_Serializer(serializers.ModelSerializer):
  class Meta:
    model = Box_Plan
    fields = [
        'id',
        'category',
        'sub_category',
        'annual_price',
        'price_per_box',
        'contents'
        ]

class Self_Teach_Plan_Serializer(serializers.ModelSerializer):
  class Meta:
    model = Self_Teach_Plan
    fields = [
        'id',
        'category',
        'sub_category',
        'annual_price',
        'price_per_month',
        ]

class Total_Beginner_Package_Serializer(serializers.ModelSerializer):
  class Meta:
    model = Total_Beginner_Package
    fields = [
        'id',
        'category',
        'sub_category',
        'price',
        'contents'
        ]