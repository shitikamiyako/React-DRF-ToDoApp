from django.contrib import admin

# Register your models here.
# from .models import Todo
from .models import Todo, Reaction
# from .models import Todo, Category

class ReactionAdmin(admin.TabularInline):
        model = Reaction

class TodoAdmin(admin.ModelAdmin):
    inlines = [ReactionAdmin]
    list_display = ('id', 'task_name')
    filter_horizontal = ['reaction_obj']



# class CategoryAdmin(admin.ModelAdmin):
#     list_display = ('id', 'category')

admin.site.register(Todo, TodoAdmin)
# admin.site.register(Category, CategoryAdmin)
