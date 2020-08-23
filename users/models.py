from django.db import models
from datetime import datetime
from django.contrib.auth.models import PermissionsMixin, UserManager
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _


class CustomUserManager(UserManager):

	use_in_migrations = True

	def _create_user(self, username, email, password, **extra_fields):
		if not email:
			raise ValueError('The given email must be set')

		email = self.normalize_email(email)
		username = self.model.normalize_username(username)
		user = self.model(username=username, email=email, **extra_fields)
		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_user(self, username, email=None, password=None, **extra_fields):

		extra_fields.setdefault('is_staff', False)
		extra_fields.setdefault('is_superuser', False)
		return self._create_user(username, email, password, **extra_fields)

	def create_superuser(self, username, email, password, **extra_fields):
		extra_fields.setdefault('is_staff', True)
		extra_fields.setdefault('is_superuser', True)
		if extra_fields.get('is_staff') is not True:
			raise ValueError('Superuser must have is_staff=True.')
		if extra_fields.get('is_superuser') is not True:
			raise ValueError('Superuser must have is_superuser=True.')
		return self._create_user(username, email, password, **extra_fields)

# CustomUserModel

class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(
        max_length=255, blank=True, null=True, unique=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(
        max_length=255, blank=True, null=True, unique=True)

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
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active."
            "Unselect this instead of deleting accounts."
        ),
    )

    objects = CustomUserManager()

    EMAIL_FIELD = 'email'
    # ログイン時のユーザー名に使用するフィールド、今回はusernameでログインしたい
    USERNAME_FIELD = 'email'
    # 管理ユーザーを作る際に必須にするフィールド、Managerで必須にしてあるのでemailフィールドを設定
    REQUIRED_FIELDS = ['username']

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("アカウント情報")


    def __str__(self):
        return self.username

# UserGroupModel

class UserGroup(models.Model):
    members = models.ManyToManyField(
        CustomUser, through="UserGroupRelation", blank=True)
    group_name = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = "UserGroup"
        verbose_name = _("UserGroup")
        verbose_name_plural = _("グループ")

    def __str__(self):
        return self.group_name

class UserGroupRelation(models.Model):
    customuser_obj = models.ForeignKey(
        CustomUser, verbose_name="ユーザー", blank=True, on_delete=models.CASCADE)
    UserGroup_obj = models.ForeignKey(
        UserGroup, verbose_name="グループ", blank=True, on_delete=models.CASCADE)
    joined_date = models.DateField(default=datetime.now)
    detail = models.CharField(max_length=64,  blank=True, verbose_name="What`s Group")

    class Meta:
        db_table = "UserGroupRelation"
        verbose_name = _("UserGroupRelation")
        verbose_name_plural = _("グループ詳細")
