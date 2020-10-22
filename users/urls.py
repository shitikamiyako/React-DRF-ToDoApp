from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import UserListAPIView, UserDetailAPIView, UserReadOnlyListAPIView, UserReadOnlyDetailAPIView
from users import views
# app_name = 'users'

urlpatterns = format_suffix_patterns([
    path('', views.api_root),
    path('api/', UserListAPIView.as_view(), name='user_list'),
    path('api/<int:pk>/', UserDetailAPIView.as_view(), name='user_detail'),
    path('api/readonly', UserReadOnlyListAPIView.as_view(), name='user_readonly_list'),
    path('api/readonly/<int:pk>/',
         UserReadOnlyDetailAPIView.as_view(), name='user_readonly_detail'),
])
