from django.shortcuts import render
from django.http import Http404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Credit_Card_Payment
from .serializers import Credit_Card_Payment_Serializer

# Create your views here.

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def credit_card_payment_list(request):
    if request.method == 'GET':
        credit_card_payments = Credit_Card_Payment.objects.all()
        serializer = Credit_Card_Payment_Serializer(credit_card_payments, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = Credit_Card_Payment_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def credit_card_payment_details(request, pk):
    if request.method == 'GET':
        credit_card_payment = Credit_Card_Payment.objects.filter(pk=pk)
        serializer = Credit_Card_Payment_Serializer(credit_card_payment, many=True)
        return Response(serializer.data)
    elif request.method == 'PUT':
        try:
            credit_card_payment = Credit_Card_Payment.objects.get(pk=pk)
        except Credit_Card_Payment.DoesNotExist:
            raise Http404
        serializer = Credit_Card_Payment_Serializer(credit_card_payment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        credit_card_payment = Credit_Card_Payment.objects.get(pk=pk).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)