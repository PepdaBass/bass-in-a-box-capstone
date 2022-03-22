from importlib.resources import path
from django.urls import path
from credit_card_payments import views

urlpatterns = [
    path('credit_card_payments/', views.credit_card_payment_list),
    path('credit_card_payment/<int:pk>/', views.credit_card_payment_details)
]