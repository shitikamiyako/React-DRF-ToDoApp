from django.contrib import admin

# Register your models here.
from .models import Todo, Category, TodoHistory


class TodoAdmin(admin.ModelAdmin):
    list_display = ('id', 'task_name')
    filter_horizontal = ['reaction_obj']



class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'category')


class TodoHistoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'add_datetime', 'close_datetime')



admin.site.register(Todo, TodoAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(TodoHistory, TodoHistoryAdmin)
