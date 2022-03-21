from django.contrib import admin
from django.urls import path, include
from shipping import views

urlpatterns = [
    path('shipping/', views.shipping_list),
    path('shipping/<int:pk>/', views.shipping_details)
]