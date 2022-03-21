from rest_framework import serializers
from .models import Shipping

class ShippingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipping
        fields = [
            'id',
            'shipping_type',
            'shipping_company',
            'shipping_cost',
            'box_plan',
            'customer',
            'total_beginner_package'
        ]