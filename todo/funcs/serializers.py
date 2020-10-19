from rest_framework import serializers
from todo.models import Todo, Category
from django.contrib.auth import get_user_model
from dj_rest_auth.serializers import UserDetailsSerializer

User = get_user_model()


class UserDetailsSerializer(serializers.ModelSerializer):
    """
    User model w/o password
    """
    class Meta:
        model = User
        fields = ('id', 'username', 'email')
        read_only_fields = ('email', )

class KnoxSerializer(serializers.Serializer):
    """
    Serializer for Knox authentication.
    """
    token = serializers.CharField()
    user = UserDetailsSerializer()

class CustomUserSerializer(serializers.HyperlinkedModelSerializer):
    todo = serializers.HyperlinkedIdentityField(
        many=True, view_name='todo_detail')

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'todo']

class CategorySerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    url = serializers.HyperlinkedIdentityField(
        view_name='category_detail', format='html')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    class Meta:
        model = Category
        fields = ['url', 'id', 'owner', 'category']

class TodoSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    # category_obj = serializers.SlugRelatedField(
    #     many=True,
    #     read_only=True,
    #     slug_field='category'
    # )
    url = serializers.HyperlinkedIdentityField(view_name='todo_detail', format='html')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    class Meta:
        model = Todo
        fields = ['url', 'id', 'owner', 'task_name', 'task_detail',
                  'category', 'rate', 'is_Completed', 'add_datetime',  'close_datetime']

