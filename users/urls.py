from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import UserListAPIView, UserDetailAPIView
from users import views
# app_name = 'users'

urlpatterns = format_suffix_patterns([
    path('', views.api_root),
    path('api/', UserListAPIView.as_view(), name='user_list'),
    path('api/<int:pk>/', UserDetailAPIView.as_view(), name='user_detail'),
])
