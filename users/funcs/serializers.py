from django.conf import settings
from rest_framework import serializers
from users.models import UserGroup, UserGroupRelation
from django.contrib.auth import get_user_model
from dj_rest_auth.serializers import UserDetailsSerializer

User = get_user_model()

# ログインユーザー情報のシリアライザ


class CustomUserDetailsSerializer(serializers.ModelSerializer):
    todo = serializers.HyperlinkedIdentityField(
        many=True, view_name='todo_detail')

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'todo')
        read_only_fields = ('email', )

# ユーザ情報のシリアライザ


class CustomUserSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='user_detail', format='html')
    todo = serializers.HyperlinkedIdentityField(
        many=True, view_name='todo_detail')

    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'email', 'todo']

# ユーザー一覧のシリアライザ


class CustomUserListSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='user_readonly_detail', format='html')

    class Meta:
        model = User
        fields = ['url', 'id', 'username']

# M2MのMembersフィールドを抽出したい


class MemberSerializer(serializers.Serializer):
    username = serializers.ReadOnlyField(
        source="customuser_obj.username")

    class Meta:
        model = UserGroupRelation
        fields = ['username']

# グループのシリアライザ


class UserGroupSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='UserGroup_detail', format='html')
    owner = serializers.ReadOnlyField(source='owner.username')
    members = MemberSerializer(source='usergrouprelation_set', many=True)

    class Meta:
        model = UserGroup
        fields = ['url', 'id', 'members', 'group_name', 'owner']

# グループを追加するためのシリアライザ
class UserGroupAddSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='UserGroup_detail', format='html')
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = UserGroup
        fields = ['url', 'id', 'group_name', 'owner']


# グループに人を追加する、削除する際に使うシリアライザ
class MemberRequestSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()

# 自分がグループに入る・抜ける際に使うシリアライザ
class UserGroupJoin_or_ReaveRequestSerializer(serializers.Serializer):
    id = serializers.IntegerField()

# グループ一覧のシリアライザ


class UserGroupListSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='UserGroup_detail', format='html')
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = UserGroup
        fields = ['url', 'id', 'group_name', 'owner']

# グループに所属している人の情報のシリアライザ


class UserGroupRelationSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='UserGroupRelation_detail', format='html')
    customuser_obj = serializers.HyperlinkedIdentityField(
        many=True, view_name='user_detail')
    UserGroup_obj = serializers.HyperlinkedIdentityField(
        many=True, view_name='UserGroup_detail')

    class Meta:
        model = UserGroupRelation
        fields = ['url', 'id', 'customuser_obj', 'UserGroup_obj', 'detail']

# グループに所属している人のシリアライザ


class UserGroupRelationListSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='UserGroupRelation_detail', format='html')
    customuser_obj = serializers.HyperlinkedIdentityField(
        many=True, view_name='user_detail')

    class Meta:
        model = UserGroupRelation
        fields = ['url', 'id', 'customuser_obj']
