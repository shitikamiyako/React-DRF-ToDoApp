from django.conf import settings
from rest_framework import serializers
from todo.models import Todo, Category
from django.contrib.auth import get_user_model
from dj_rest_auth.serializers import UserDetailsSerializer

User = get_user_model()
REACTION_OPTION = settings.REACTION_OPTION


class UserDetailsSerializer(serializers.ModelSerializer):
    """
    User model w/o password
    """
    class Meta:
        model = User
        fields = ('id', 'username', 'email')
        read_only_fields = ('email', )


class CustomUserSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='user_detail', format='html')
    todo = serializers.HyperlinkedIdentityField(
        many=True, view_name='todo_detail')

    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'email', 'todo']

class CustomUserListSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='user_readonly_detail', format='html')


    class Meta:
        model = User
        fields = ['url', 'id', 'username']

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
    reaction_obj = serializers.SerializerMethodField(read_only=True)
    # category_obj = serializers.SlugRelatedField(
    #     many=True,
    #     read_only=True,
    #     slug_field='category'
    # )
    url = serializers.HyperlinkedIdentityField(view_name='todo_detail', format='html')

    def get_reaction_obj(self, obj):
        return obj.reaction_obj.count()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    class Meta:
        model = Todo
        fields = ['url', 'id', 'owner', 'task_name', 'task_detail', 'reaction_obj',
                  'category', 'rate', 'is_Completed', 'add_datetime',  'close_datetime']

class ReactionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    # action = serializers.CharField()

    def validate_action(self, value):
        value = value.lower().strip() # 値整形
        if not value in REACTION_OPTION:
            raise serializers.ValidationError("This is not a valid action for Reaction")
        return value


class KnoxSerializer(serializers.Serializer):
    """
    Serializer for Knox authentication.
    """
    token = serializers.CharField()
    user = UserDetailsSerializer()
