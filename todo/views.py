from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import permissions
from .models import Todo
from todo.funcs.serializers import TodoSerializer
from todo.funcs.permissions import IsOwnerOrReadOnly
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse


# Create your views here.


class TodoListAPIView(ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    # APIのレスポンスにペジネーションの情報を含まない
    # def get_paginated_response(self, data):
    #     return Response(data)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TodoDetailAPIView(RetrieveUpdateDestroyAPIView):

    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


# root View
@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'todo': reverse('todo_list', request=request, format=format)
    })
