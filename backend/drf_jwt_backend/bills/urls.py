from django.contrib import admin
from django.urls import path, include
from bills import views

urlpatterns = [
    path('bills/', views.bill_list),
    path('bill/<int:pk>/', views.bill_details)
]