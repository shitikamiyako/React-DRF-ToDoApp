# Generated by Django 3.1 on 2020-11-15 21:45

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import users.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(blank=True, max_length=255, null=True, unique=True)),
                ('password', models.CharField(blank=True, max_length=255, null=True)),
                ('email', models.CharField(blank=True, max_length=255, null=True, unique=True)),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active.Unselect this instead of deleting accounts.', verbose_name='active')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'User',
                'verbose_name_plural': 'アカウント情報',
            },
            managers=[
                ('objects', users.models.CustomUserManager()),
            ],
        ),
        migrations.CreateModel(
            name='UserGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group_name', models.CharField(blank=True, max_length=255, null=True)),
                ('detail', models.CharField(blank=True, max_length=60, verbose_name='Group_Detail')),
            ],
            options={
                'verbose_name': 'UserGroup',
                'verbose_name_plural': 'グループ',
                'db_table': 'UserGroup',
            },
        ),
        migrations.CreateModel(
            name='UserGroupRelation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('joined_date', models.DateField(default=datetime.datetime.now)),
                ('detail', models.CharField(blank=True, max_length=64, verbose_name='What`s Group')),
                ('UserGroup_obj', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='users.usergroup', verbose_name='グループ')),
                ('customuser_obj', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='ユーザー')),
            ],
            options={
                'verbose_name': 'UserGroupRelation',
                'verbose_name_plural': 'グループ詳細',
                'db_table': 'UserGroupRelation',
            },
        ),
        migrations.AddField(
            model_name='usergroup',
            name='members',
            field=models.ManyToManyField(blank=True, through='users.UserGroupRelation', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='usergroup',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='GroupOwner', to=settings.AUTH_USER_MODEL, verbose_name='ユーザー'),
        ),
    ]
