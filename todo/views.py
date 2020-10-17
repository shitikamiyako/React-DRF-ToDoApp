from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework import permissions
from .models import Todo, Category
from todo.funcs.serializers import TodoSerializer, CategorySerializer
from todo.funcs.permissions import IsOwnerOrReadOnly
from todo.funcs.paginations import CategoryListPagination
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend



# Create your views here.


class TodoListAPIView(ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    # django-filterでフィルタリングするための定義、複数の値をフィルタリングの値にするならリストで定義
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ('owner', 'task_name')
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


    # APIのレスポンスにペジネーションの情報を含まない
    # def get_paginated_response(self, data):
    #     return Response(data)

    # ログインユーザーのデータのみ返す
    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(owner=user)


    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TodoDetailAPIView(RetrieveUpdateDestroyAPIView):

    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


# class CategoryListAPIView(ListCreateAPIView):
#     queryset = Category.objects.all()
#     serializer_class = CategorySerializer
#     # django-filterでフィルタリングするための定義、複数の値をフィルタリングの値にするならリストで定義
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ('owner', "category")
#     permission_classes = [
#         permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
#     pagination_class = CategoryListPagination

#     # APIのレスポンスにペジネーションの情報を含まない
#     # def get_paginated_response(self, data):
#     #     return Response(data)

#     # ログインユーザーのデータのみ返す
#     def get_queryset(self):
#         user = self.request.user
#         return Category.objects.filter(owner=user)

#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)

# class CategoryDetailAPIView(RetrieveUpdateDestroyAPIView):

#     queryset = Category.objects.all()
#     serializer_class = CategorySerializer
#     permission_classes = [
#         permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

# root View
@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'todo': reverse('todo_list', request=request, format=format)
    })
