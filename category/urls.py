from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import CategoryListAPIView, CategoryDetailAPIView
from category import views


# app_name = 'todo'

urlpatterns = format_suffix_patterns([
    path('', views.api_root),
    path('api/', CategoryListAPIView.as_view(), name='category_list'),
    path('api/<int:pk>/', CategoryDetailAPIView.as_view(), name='category_detail'),
])
