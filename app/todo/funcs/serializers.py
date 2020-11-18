from django.conf import settings
from rest_framework import serializers
from app.todo.models import Todo, Category
from django.contrib.auth import get_user_model
from dj_rest_auth.serializers import UserDetailsSerializer

User = get_user_model()
REACTION_OPTION = settings.REACTION_OPTION

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
    # reaction_objを取得する。実際は後述のメソッドのreturnの値を取得
    reaction_obj = serializers.SerializerMethodField(read_only=True)
    # category_obj = serializers.SlugRelatedField(
    #     many=True,
    #     read_only=True,
    #     slug_field='category'
    # )
    url = serializers.HyperlinkedIdentityField(view_name='todo_detail', format='html')

    # 該当タスクidが含まれているreaction_objを計数する
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

    def validate_action(self, value):
        value = value.lower().strip() # 値整形
        if not value in REACTION_OPTION:
            raise serializers.ValidationError("This is not a valid action for Reaction")
        return value