from django.db import models
from datetime import datetime
from users.models import CustomUser, UserGroup


class Category(models.Model):

    category = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = "Category"
        verbose_name = "Category"
        verbose_name_plural = "タスク：カテゴリー"

    def __str__(self):
        return self.category


class TodoHistory(models.Model):
    add_datetime = models.DateTimeField(
        "追加日", default=datetime.now)
    close_datetime = models.DateTimeField(
        "完了日", default=datetime.now)

    class Meta:
        db_table = "TodoHistory"
        verbose_name = "TodoHistory"
        verbose_name_plural = "タスク:追加・完了履歴"


# Todoモデル
# rate


class Todo(models.Model):
    task_name = models.CharField(max_length=255, blank=True, null=True)
    task_detail = models.TextField(blank=True, null=True)
    group_obj = models.ForeignKey(
        UserGroup, verbose_name="グループ", blank=True, null=True, on_delete=models.CASCADE)
    category_obj = models.ForeignKey(
        Category,
        verbose_name='カテゴリー', blank=True, null=True,
        on_delete=models.CASCADE
    )
    rate = models.FloatField(blank=True, null=True)
    reaction_obj = models.ManyToManyField(
        CustomUser, related_name="like", blank=True)
    todohistory_obj = models.ForeignKey(
        TodoHistory, verbose_name="日時", blank=True, null=True, on_delete=models.CASCADE)

    class Meta:
        db_table = "Todo"
        verbose_name = "Todo"
        verbose_name_plural = "タスク情報"

    def __str__(self):
        return self.task_name
