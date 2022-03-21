from rest_framework import serializers
from .models import Shipping

class ShippingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipping
        fields = [
            'id',
            'customer',
            'box_plan',
            'total_beginner_package',
            'shipping_type',
            'shipping_company',
            'shipping_cost'
        ]