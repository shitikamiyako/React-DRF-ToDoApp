from django.urls import path
from .views import TodoListView

app_name = 'todo'

urlpatterns = [
    path('top/', TodoListView.as_view(), name='list'),
]