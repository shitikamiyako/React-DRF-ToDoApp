from django.db import models
from datetime import datetime
from users.models import CustomUser, UserGroup

# Todoモデル


class Todo(models.Model):
    task_name = models.CharField(max_length=255, blank=True, null=True)
    task_detail = models.TextField(blank=True, null=True)
    # group_obj = models.ForeignKey(
    #     UserGroup, verbose_name="グループ", on_delete=models.CASCADE)
    # category_obj = models.ForeignKey(Category, verbose_name=on_delete=models.CASCADE)
    rate = models.FloatField(blank=True, null=True)
    # reaction_obj = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = "Todo"
        verbose_name = "Todo"
        verbose_name_plural = "タスク情報"

    def __str__(self):
        return self.task_name


class Category(models.Model):

    category = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = "Category"
        verbose_name = "Category"
        verbose_name_plural = "タスク：カテゴリー"

    def __str__(self):
        return self.category


class TodoHistory(models.Model):
    # customuser_obj = models.ForeignKey(
    #     CustomUser, verbose_name="ユーザー", on_delete=models.CASCADE)
    # Todo_obj = models.ForeignKey(
    #     Todo, verbose_name="Todo", on_delete=models.CASCADE)
    add_datetime = models.DateTimeField(
        "追加日", blank=True, null=True, default=datetime.now)
    close_datetime = models.DateTimeField(
        "完了日", blank=True, null=True, default=datetime.now)

    class Meta:
        db_table = "TodoHistory"
        verbose_name = "TodoHistory"
        verbose_name_plural = "タスク:追加・完了履歴"


class Reaction(models.Model):
    # customuser_obj = models.ForeignKey(
    #     CustomUser, verbose_name="ユーザー", on_delete=models.CASCADE)
    # Todo_obj = models.ForeignKey(
    #     Todo, verbose_name="Todo", on_delete=models.CASCADE)
    reaction = models.IntegerField

    class Meta:
        db_table = 'Reaction'
        verbose_name = 'Reaction'
        verbose_name_plural = 'タスク：いいね数'
