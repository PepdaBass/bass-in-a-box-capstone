from importlib.resources import path
from django.urls import path
from customers import views

urlpatterns = [
    path('customer/create/', views.create_customer)
]