from rest_framework import serializers
from .models import Customer
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username']

class CustomerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Customer
    fields = [
        'id',
        'first_name',
        'last_name',
        'street_address',
        'city',
        'state',
        'zip_code',
        'country',
        'telephone'
        ]