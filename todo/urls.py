from django.urls import path
from .views import TodoListAPIView, TodoDetailAPIView

app_name = 'todo'

urlpatterns = [
    path('api/', TodoListAPIView.as_view(), name='todo_list'),
    path('api/<int:pk>/', TodoDetailAPIView.as_view(), name='todo_detail'),
]
