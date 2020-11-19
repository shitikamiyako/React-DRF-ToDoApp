from django.urls import path,path
from . import views


urlpatterns = [
    path('', views.index, name='index_page'),
    path('login/', views.index, name='other_page'),
    path('signup/', views.index, name='other_page'),
    path('logout/', views.index, name='other_page'),
    path('todo/top/', views.index, name='other_page'),
    path('todo/list/<path>', views.index, name='other_page'),
    path('todo/delete/<int:pk>/', views.index, name='other_page'),
    path('todo/edit/<int:pk>/', views.index, name='other_page'),
    path('todo/timer/<int:pk>/', views.index, name='other_page'),
    path('user_info/', views.index, name='other_page'),
    path('password_change/', views.index, name='other_page'),
    path('unsubscribe/', views.index, name='other_page'),
    path('user_group/top/', views.index, name='other_page'),
    path('user_group/<int:pk>/members/', views.index, name='other_page'),
    path('user_group/joined/', views.index, name='other_page'),
    path('user_group/list/<str:username>/', views.index, name='other_page'),
]
