from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import UserListAPIView, UserDetailAPIView, UserReadOnlyListAPIView, UserReadOnlyDetailAPIView, UserGroupAddAPIView, UserGroupListAPIView, UserGroupDetailAPIView, UserGroupReadOnlyListAPIView, UserGroupDetailReadOnlyAPIView, groupJoin_view, groupLeave_view, memberDelete_view, memberAdd_view
from users import views
# app_name = 'users'

urlpatterns = format_suffix_patterns([
    path('', views.api_root),
    path('api/', UserListAPIView.as_view(), name='user_list'),
    path('api/<int:pk>/', UserDetailAPIView.as_view(), name='user_detail'),
    path('api/UserGroup/', UserGroupListAPIView.as_view(), name='UserGroup_list'),
    path('api/UserGroup/<int:pk>/',
         UserGroupDetailAPIView.as_view(), name='UserGroup_detail'),
    path('api/UserGroup_readonly/',
         UserGroupReadOnlyListAPIView.as_view(), name='UserGroup_readonly_list'),
    path('api/UserGroup_readonly/<int:pk>/',
         UserGroupDetailReadOnlyAPIView.as_view(), name='UserGroup_readonly_detail'),
    path('api/UserGroup_add/', UserGroupAddAPIView.as_view(), name='UserGroup_add'),
    path('api/UserGroup_memberAdd/<int:pk>/',
         memberAdd_view, name='UserGroup_memberAdd_detail'),
    path('api/UserGroup_memberDelete/<int:pk>/',
         memberDelete_view, name='UserGroup_memberDelete_detail'),
    path('api/UserGroup_join/<int:pk>/',
         groupJoin_view, name='UserGroup_join_detail'),
        path('api/UserGroup_leave/<int:pk>/',
             groupLeave_view, name='UserGroup_leave_detail'),
    path('api/readonly', UserReadOnlyListAPIView.as_view(),
         name='user_readonly_list'),
    path('api/readonly/<int:pk>/',
         UserReadOnlyDetailAPIView.as_view(), name='user_readonly_detail'),
])
