from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Employee(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    telephone = models.CharField(max_length=20)
    department = models.CharField(max_length=30)
    position = models.CharField(max_length=30)
