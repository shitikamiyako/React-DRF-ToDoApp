from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import permissions
from app.users.funcs.serializers import CustomUserSerializer, CustomUserDetailsSerializer, CustomUserListSerializer, UserGroupSerializer, UserGroupListSerializer, UserGroupAddSerializer, MemberRequestSerializer, UserGroupJoin_or_ReaveRequestSerializer, CustomUserLimitSerializer
from app.todo.funcs.permissions import IsOwnerOrReadOnly
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from dj_rest_auth.views import LoginView
from rest_framework.decorators import api_view, permission_classes
from dj_rest_auth.registration.views import RegisterView
from django_filters.rest_framework import DjangoFilterBackend
from allauth.account.utils import complete_signup
from allauth.account import app_settings as allauth_settings
from .models import UserGroup, UserGroupRelation, CustomUser
User = get_user_model()

# 読み取り専用のユーザーView


class UserReadOnlyListAPIView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserListSerializer
    # django-filterでフィルタリングするための定義、複数の値をフィルタリングの値にするならリストで定義
    filter_backends = [DjangoFilterBackend]
    # usernameフィールドで絞り込めるようにする
    filterset_fields = ['username']
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly]

# ランダム5件までのユーザーidとusernameを返すView

class UserReadOnlyLimitListAPIView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserLimitSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return User.objects.order_by('?')[:5]

# 読み取り専用のユーザー詳細View


class UserReadOnlyDetailAPIView(RetrieveAPIView):

    queryset = User.objects.all()
    serializer_class = CustomUserListSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly]

# ユーザーView


class UserListAPIView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly]

    # APIのレスポンスにペジネーションの情報を含まない
    def get_paginated_response(self, data):
        return Response(data)


# ユーザー詳細View
class UserDetailAPIView(RetrieveUpdateDestroyAPIView):

    queryset = User.objects.all()
    serializer_class = CustomUserDetailsSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly]


# グループリストView(グループを作る、作ったグループを見る)


class UserGroupListAPIView(ListCreateAPIView):
    queryset = UserGroup.objects.all()
    serializer_class = UserGroupSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    # ログインユーザーのデータのみ返す
    def get_queryset(self):
        user = self.request.user
        return UserGroup.objects.filter(owner=user)

# 読み出し専用グループリストView


class UserGroupReadOnlyListAPIView(ListAPIView):
    queryset = UserGroup.objects.all()
    serializer_class = UserGroupSerializer
    # django-filterでフィルタリングするための定義、複数の値をフィルタリングの値にするならリストで定義
    filter_backends = [DjangoFilterBackend]
    # ownerフィールドで絞り込めるようにする
    filterset_fields = ['owner__username']
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly]

# 自分が所属しているグループを返すView
class UserGroupJoinedListAPIView(ListAPIView):
    queryset = UserGroup.objects.all()
    serializer_class = UserGroupSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        return user.usergroup_set.all()



# グループ追加View
class UserGroupAddAPIView(ListCreateAPIView):
    queryset = UserGroup.objects.all()
    serializer_class = UserGroupAddSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


# グループ詳細View(グループ名、グループの削除)


class UserGroupDetailAPIView(RetrieveUpdateDestroyAPIView):

    queryset = UserGroup.objects.all()
    serializer_class = UserGroupSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly]

# 読み出し専用グループ詳細


class UserGroupDetailReadOnlyAPIView(RetrieveAPIView):

    queryset = UserGroup.objects.all()
    serializer_class = UserGroupSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly]


@api_view(['POST'])
@permission_classes([
    permissions.IsAuthenticatedOrReadOnly])
def groupJoin_view(request, *args, **kwargs):
    """
    id is required.
    """
    serializer = UserGroupJoin_or_ReaveRequestSerializer(data=request.data)
    # pagination_class = ReactionPagination
    User = request.user
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        group_id = data.get("id")
        # 該当グループ抽出
        queryset = UserGroup.objects.filter(id=group_id)
        # クエリセットの実行結果でタスクが取得できなかった場合
        if not queryset.exists():
            return Response({}, status=404)
        # 取得してきたものをインスタンス化
        obj = queryset.first()
        # すでに追加済みだった場合、エラー
        if User in obj.members.all():
            return Response({}, status=404)
        # 追加処理
        else:
            obj.members.add(request.user)
            return Response("Request Success", status=200)

@api_view(['POST'])
@permission_classes([
    permissions.IsAuthenticatedOrReadOnly])
def memberAdd_view(request, *args, **kwargs):
    """
    id and username is required.
    """
    serializer = MemberRequestSerializer(data=request.data)
    # pagination_class = ReactionPagination
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        group_id = data.get("id")
        member_name = data.get("username")
        # 該当グループ抽出
        queryset = UserGroup.objects.filter(id=group_id)
        # クエリセットの実行結果でタスクが取得できなかった場合
        if not queryset.exists():
            return Response("該当するグループがありません", status=404)
        # 該当ユーザー抽出
        queryset2 = CustomUser.objects.filter(username=member_name)
        # クエリセットの実行結果でタスクが取得できなかった場合
        if not queryset2.exists():
            return Response(data, status=404)
        # 取得してきたものをインスタンス化
        obj = queryset.first()
        Member = queryset2.first()
        # すでに追加済みだった場合、エラー
        if Member in obj.members.all():
            return Response({}, status=404)
        # 追加処理
        else:
            obj.members.add(Member)
            return Response("Request Success", status=200)


@api_view(['PATCH'])
@permission_classes([
    permissions.IsAuthenticatedOrReadOnly])
def groupLeave_view(request, *args, **kwargs):
    """
    id is required.
    """
    serializer = UserGroupJoin_or_ReaveRequestSerializer(data=request.data)
    # pagination_class = ReactionPagination
    User = request.user
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        group_id = data.get("id")
        # action = data.get("action")
        # 該当タスク抽出
        queryset = UserGroup.objects.filter(id=group_id)
        # クエリセットの実行結果でタスクが取得できなかった場合
        if not queryset.exists():
            return Response({}, status=404)
        # 取得してきたものをインスタンス化
        obj = queryset.first()
        # 削除処理
        if User in obj.members.all():
            obj.members.remove(request.user)
            return Response("Request Success", status=200)
        # ユーザーが存在しなかった場合エラー
        else:
            return Response({}, status=404)

@api_view(['PATCH'])
@permission_classes([
    permissions.IsAuthenticatedOrReadOnly])
def memberDelete_view(request, *args, **kwargs):
    """
    id and username is required.
    """
    serializer = MemberRequestSerializer(data=request.data)
    # pagination_class = ReactionPagination
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        group_id = data.get("id")
        member_name = data.get("username")
        # 該当グループ抽出
        queryset = UserGroup.objects.filter(id=group_id)
        # クエリセットの実行結果でタスクが取得できなかった場合
        if not queryset.exists():
            return Response("該当するグループがありません", status=404)
        # 該当ユーザー抽出
        queryset2 = User.objects.filter(username=member_name)
        # クエリセットの実行結果でタスクが取得できなかった場合
        if not queryset2.exists():
            return Response(data, status=404)
        # 取得してきたものをインスタンス化
        obj = queryset.first()
        Member = queryset2.first()
        # すでに追加済みだった場合、エラー
        if Member in obj.members.all():
            obj.members.remove(Member)
            return Response("Request Success", status=200)
        # Memberが存在しない場合、エラー
        else:
            return Response("このグループにこのユーザーは存在しません", status=404)




@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user_list', request=request, format=format)
    })
