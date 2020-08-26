from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from .models import Todo
from todo.funcs.serializers import TodoSerializer

# Create your views here.


class TodoListAPIView(ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    # APIのレスポンスにペジネーションの情報を含まない
    def get_paginated_response(self, data):
        return Response(data)

class TodoDetailAPIView(RetrieveAPIView):

    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
