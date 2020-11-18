from django.shortcuts import render, get_object_or_404
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import permissions
from .models import Todo, Category
from app.todo.funcs.serializers import TodoSerializer, CategorySerializer, ReactionSerializer
from app.todo.funcs.permissions import IsOwnerOrReadOnly
from app.todo.funcs.paginations import CategoryListPagination, ReactionPagination
from rest_framework.decorators import api_view, permission_classes
from rest_framework.reverse import reverse
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import get_user_model
import datetime


# Create your views here.

# ユーザーがタスクを追加・一覧表示するためのView
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

# いいねを管理するView、中間モデルを使うのでモデルに依存しないAPIViewを使う。今回は関数ベースのそれ。
@api_view(['POST'])
@permission_classes([
    permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly])
def reaction_view(request, *args, **kwargs):
    """
    id is required.
    Action Option are: Like, Unlike
    """
    serializer = ReactionSerializer(data=request.data)
    pagination_class = ReactionPagination
    User = request.user
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        task_id = data.get("id")
        # action = data.get("action")
        # 該当タスク抽出
        queryset = Todo.objects.filter(id=task_id)
        # クエリセットの実行結果でタスクが取得できなかった場合
        if not queryset.exists():
            return Response({}, status=404)
        # 取得してきたものをインスタンス化
        obj = queryset.first()
        # すでにいいね済みだった場合、いいねを取り消す
        if User in obj.reaction_obj.all():
            obj.reaction_obj.remove(request.user)
            like_sum = obj.reaction_obj.count()
            return Response(like_sum, status=200)
        # いいね処理
        else:
            obj.reaction_obj.add(request.user)
            like_sum = obj.reaction_obj.count()
            return Response(like_sum, status=200)

            # return Response(serializer.data, status=200)
        # # リクエストでaction=Likeを受け取ったらいいね処理
        # if action == "like":
        #     obj.reaction_obj.add(request.user)
        #     return Response(serializer.data, status=200)
        # # すでにいいね済みだった場合、いいねを取り消す
        # elif action == "unlike":
        #     obj.reaction_obj.remove(request.user)
            # return Response(serializer.data, status=200)
    return Response({"message": "Action Success"}, status=200)

# タスクの編集・削除のためのView
class TodoDetailAPIView(RetrieveUpdateDestroyAPIView):

    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    # パラメータ取得
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)


    def patch(self, request, *args, **kwargs):
        data = request.data
        # 取得したパラメーターからタスクのpkを抽出
        task_id = self.kwargs['pk']
        # リクエストからタスクの完了・未完了フラグを取得
        is_Completed = data.get("is_Completed")
        # タスクをフィルタリング
        queryset = Todo.objects.filter(id=task_id)
        # インスタンス化
        obj = queryset.first()
        # Falseの場合はclose_datetime(タスクの完了日)をnullにする
        if(is_Completed == False):
            obj.close_datetime = None
            obj.save()
            return self.partial_update(request, *args, **kwargs)
        # Trueなら完了日を登録
        else:
            obj.close_datetime = datetime.datetime.now()
            obj.save()
            return self.partial_update(request, *args, **kwargs)

# 他人のタスクを閲覧したり、自分のタスクを他人に閲覧させるためのView
class TodoReadOnlyListAPIView(ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    # django-filterでフィルタリングするための定義、複数の値をフィルタリングの値にするならリストで定義
    filter_backends = [DjangoFilterBackend]
    # ownerフィールドで絞り込んで渡すようにする
    filterset_fields = ['owner__username']
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    # APIのレスポンスにペジネーションの情報を含まない
    # def get_paginated_response(self, data):
    #     return Response(data)

# 他人のタスクの詳細を閲覧したり、自分のタスクの詳細を他人に閲覧させるためのView
class TodoReadOnlyDetailAPIView(RetrieveAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['owner__username']
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
