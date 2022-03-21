from importlib.resources import path
from django.urls import path
from box_plans import views

urlpatterns = [
    path('box_plans/', views.box_plan_list),
    path('box_plan/<int:pk>/', views.box_plan_details),
    path('self_teach_plans/', views.self_teach_plan_list),
    path('self_teach_plan/<int:pk>/', views.self_teach_plan_details),
    path('total_beginner_packages/', views.total_beginner_package_list),
    path('total_beginner_package/<int:pk>/', views.total_beginner_package_details)
]