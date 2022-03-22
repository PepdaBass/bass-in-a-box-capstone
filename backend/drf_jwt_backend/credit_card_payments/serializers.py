from rest_framework import serializers
from .models import Credit_Card_Payment

class Credit_Card_Payment_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Credit_Card_Payment
        fields = [
            'id',
            'cc_type',
            'cc_number',
            'cc_exp_date',
            'cc_cvv',
            'cc_full_name',
            'is_valid',
            'customer'
        ]