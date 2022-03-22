from rest_framework import serializers
from .models import Bill

class BillSerializer(serializers.ModelSerializer):
    class meta:
        model = Bill
        fields = [
            'id',
            'total_amount',
            'is_paid',
            'credit_card_payment',
            'customer',
            'shipping'
        ]