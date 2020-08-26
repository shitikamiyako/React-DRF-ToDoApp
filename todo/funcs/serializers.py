from rest_framework import serializers
from todo.models import Todo


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'task_name', 'task_detail', 'group_obj',
                  'category_obj', 'rate', 'reaction_obj', 'add_datetime', 'task_name', 'close_datetime', 'owner',)
