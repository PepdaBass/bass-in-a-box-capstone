from django.shortcuts import render
from django.http import Http404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Box_Plan, Self_Teach_Plan, Total_Beginner_Package
from .serializers import Box_Plan_Serializer, Self_Teach_Plan_Serializer, Total_Beginner_Package_Serializer


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def box_plan_list(request):
    if request.method == 'GET':
        box_plans = Box_Plan.objects.all()
        serializer = Box_Plan_Serializer(box_plans, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = Box_Plan_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def box_plan_details(request, pk):
    if request.method == 'GET':
        box_plan = Box_Plan.objects.filter(pk=pk)
        serializer = Box_Plan_Serializer(box_plan, many=True)
        return Response(serializer.data)
    elif request.method == 'PUT':
        try:
            box_plan = Box_Plan.objects.get(pk=pk)
        except Box_Plan.DoesNotExist:
            raise Http404
        serializer = Box_Plan_Serializer(box_plan, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        box_plan = Box_Plan.objects.get(pk=pk).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)