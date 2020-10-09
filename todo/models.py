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

# Todoモデル
# Nullオプションは後で調整
# DRF導入のタイミングでownerフィールド追加(そのTodoがどのユーザーのTodoなのかを紐つける)


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
    owner = models.ForeignKey(
        CustomUser, verbose_name="ユーザー", related_name="todo", blank=True, null=True, on_delete=models.CASCADE)

    is_Completed = models.BooleanField(blank=True,default=False)
    add_datetime = models.DateTimeField(
        "追加日", default=datetime.now)
    close_datetime = models.DateTimeField(
        "完了日", blank=True, null=True)

    class Meta:
        db_table = "Todo"
        verbose_name = "Todo"
        verbose_name_plural = "タスク情報"

    def __str__(self):
        return self.task_name
