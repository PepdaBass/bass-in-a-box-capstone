from django.shortcuts import render
from django.http import Http404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Shipping
from .serializers import ShippingSerializer

# Create your views here.


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def shipping_list(request):
    if request.method == 'GET':
        shipping_orders = Shipping.objects.all()
        serializer = ShippingSerializer(shipping_orders, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ShippingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def shipping_details(request, pk):
    if request.method == 'GET':
        shipping_order = Shipping.objects.filter(pk=pk)
        serializer = ShippingSerializer(shipping_order, many=True)
        return Response(serializer.data)
    elif request.method == 'PUT':
        try:
            shipping_order = Shipping.objects.get(pk=pk)
        except Shipping.DoesNotExist:
            raise Http404
        serializer = ShippingSerializer(shipping_order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        shipping_order = Shipping.objects.get(pk=pk).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)