from django.contrib import admin

# Register your models here.
from .models import CustomUser, UserGroup, UserGroupRelation


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username')


class UserGroupRelationInline(admin.TabularInline):
    model = UserGroupRelation
    extra = 0


class UserGroupAdmin(admin.ModelAdmin):
    list_display = ('id', 'group_name', '_members')
    inlines = [
        UserGroupRelationInline,
    ]
    exclude = ('members',)

    def _members(self, obj):
        return ','.join([x.username for x in obj.members.all()])


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(UserGroup, UserGroupAdmin)
admin.site.register(UserGroupRelation)
