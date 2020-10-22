from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import TodoListAPIView, TodoDetailAPIView, TodoReadOnlyListAPIView, TodoReadOnlyDetailAPIView
from todo import views


# app_name = 'todo'

urlpatterns = format_suffix_patterns( [
    path('', views.api_root),
    path('api/', TodoListAPIView.as_view(), name='todo_list'),
    path('api/<int:pk>/', TodoDetailAPIView.as_view(), name='todo_detail'),
    path('api/readonly', TodoReadOnlyListAPIView.as_view(),
         name='todo_list_readonly'),
    path('api/readonly/<int:pk>/', TodoReadOnlyDetailAPIView.as_view(),
         name='todo_detail_readonly'),
] )
