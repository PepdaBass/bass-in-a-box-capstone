from rest_framework import serializers
from .models import Employee
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username']

class EmployeeSerializer(serializers.ModelSerializer):
  class Meta:
    model = Employee
    fields = [
        'id',
        'first_name',
        'last_name',
        'telephone',
        'department',
        'position'
        ]