from django.urls import re_path ,path
from . import views

urlpatterns = [
    path('', views.index, name='index_page'),
    path('login/', views.index, name='other_page'),
    path('signup/', views.index, name='other_page'),
    path('logout/', views.index, name='other_page'),
    path('todo/top/', views.index, name='other_page'),
    path('todo/list/', views.index, name='other_page'),
    re_path(r'^todo/list/[^/]+/$', views.index, name='other_page'),
    re_path(r'^todo/delete/[0-9]+/$', views.index, name='other_page'),
    re_path(r'^todo/edit/[0-9]+/$', views.index, name='other_page'),
    re_path(r'^todo/timer/[0-9]+/$', views.index, name='other_page'),
    # path('todo/edit/<int:number>/', views.index, name='other_page'),
    # path('todo/timer/<int:number>/', views.index, name='other_page'),
    # path('user_group/edit/<int:number>/', views.index, name='other_page'),
    # path('user_group/delete/<int:number>/', views.index, name='other_page'),
    # path('user_group/<int:pk>/members/', views.index, name='other_page'),
    # path('user_group/list/<slug>/', views.index, name='other_page'),
    path('user_info/', views.index, name='other_page'),
    path('password_change/', views.index, name='other_page'),
    path('unsubscribe/', views.index, name='other_page'),
    path('user_group/top/', views.index, name='other_page'),
    re_path(r'^user_group/edit/[0-9]+/$', views.index, name='other_page'),
    re_path(r'^user_group/delete/[0-9]+/$', views.index, name='other_page'),
    re_path(r'^user_group/[0-9]+/members/$', views.index, name='other_page'),
    path('user_group/joined/', views.index, name='other_page'),
    re_path(r'^user_group/list/[^/]+/$', views.index, name='other_page'),
]

# handler404 = 'app.frontend.views.error_404'