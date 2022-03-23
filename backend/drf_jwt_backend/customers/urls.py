from importlib.resources import path
from django.urls import path
from customers import views
from .models import Customer

urlpatterns = [
    path('customer/<int:pk>/', views.get_customer_information),
    path('customer/create/', views.create_customer),
    path('customer/edit/<int:pk>/', views.edit_customer)
]