from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import TodoListAPIView, TodoDetailAPIView
from todo import views


# app_name = 'todo'

urlpatterns = format_suffix_patterns( [
    path('', views.api_root),
    path('api/', TodoListAPIView.as_view(), name='todo_list'),
    path('api/<int:pk>/', TodoDetailAPIView.as_view(), name='todo_detail'),
] )
