"""drf_jwt_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from employees import views

urlpatterns = [
    path('employee/<int:pk>/', views.get_employee_information),
    path('employee/create/', views.create_employee),
    path('employee/edit/<int:pk>/', views.edit_employee),
    path('employee/all_customers/', views.get_all_customers),
    path('employee/delete/<int:pk>/', views.delete_customer),
    path('employees/', views.get_all_employees)
]