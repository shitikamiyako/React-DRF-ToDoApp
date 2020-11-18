from django.db import models
from app.users.models import CustomUser
# Create your models here.


class Category(models.Model):

    owner = models.ForeignKey(
        CustomUser, verbose_name="ユーザー", related_name="category", blank=True, null=True, on_delete=models.CASCADE)
    category = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = "Category"
        verbose_name = "Category"
        verbose_name_plural = "タスク：カテゴリー"

    def __str__(self):
        return self.category
