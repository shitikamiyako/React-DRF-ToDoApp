from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import permissions
from todo.funcs.serializers import TodoSerializer, CustomUserSerializer, CustomUserListSerializer
from todo.funcs.permissions import IsOwnerOrReadOnly
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from dj_rest_auth.views import LoginView
from dj_rest_auth.registration.views import RegisterView

from allauth.account.utils import complete_signup
from allauth.account import app_settings as allauth_settings

from todo.funcs.serializers import KnoxSerializer
from users.funcs.utils import create_knox_token

# Create your views here.

User = get_user_model()


class UserReadOnlyListAPIView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserListSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


class UserReadOnlyDetailAPIView(RetrieveAPIView):

    queryset = User.objects.all()
    serializer_class = CustomUserListSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

class UserListAPIView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    # APIのレスポンスにペジネーションの情報を含まない
    def get_paginated_response(self, data):
        return Response(data)


class UserDetailAPIView(RetrieveUpdateDestroyAPIView):

    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]



@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user_list', request=request, format=format)
    })

# Sessionを使ったログインに対するView


# overrideKnox because Integrate django-rest-knox with django-rest-auth

# class KnoxLoginView(LoginView):

#     def get_response(self):
#         serializer_class = self.get_response_serializer()

#         data = {
#             'user': self.user,
#             'token': self.token
#         }
#         serializer = serializer_class(instance=data, context={
#                                       'request': self.request})

#         return Response(serializer.data, status=200)


# class KnoxRegisterView(RegisterView):

#     def get_response_data(self, user):
#         return KnoxSerializer({'user': user, 'token': self.token}).data

#     def perform_create(self, serializer):
#         user = serializer.save(self.request)
#         self.token = create_knox_token(None, user, None)
#         complete_signup(self.request._request, user,
#                         allauth_settings.EMAIL_VERIFICATION, None)
#         return user
