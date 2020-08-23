from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _

# CustomUserModel


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(
        max_length=255, blank=True, null=True,  unique=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(
        max_length=255, blank=True, null=True, unique=True)
    # group_obj = models.ForeignKey(
    #     UserGroup, verbose_name="グループ", on_delete=models.CASCADE)

    # 管理サイトへのアクセス権限フラグ
    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_(
            "Designates whether the user can log into this admin site."
        ),
    )

    is_active = models.BooleanField(
        _("active"),
        default=False,
        help_text=_(
            "Designates whether this user should be treated as active."
            "Unselect this instead of deleting accounts."
        ),
    )

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    class Meta:
        db_table = "CustomUser"
        verbose_name = _("User")
        verbose_name_plural = _("アカウント情報")

    def __str__(self):
        return str(self.username)

# UserGroupModel


class UserGroup(models.Model):
    # customuser_obj = models.ForeignKey(
    #     CustomUser, verbose_name="ユーザー", on_delete=models.CASCADE)
    group_name = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = "UserGroup"
        verbose_name = _("UserGroup")
        verbose_name_plural = _("グループ機能")

    def __str__(self):
        return self.group_name
