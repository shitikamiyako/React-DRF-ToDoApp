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

import json
import requests
import urllib.parse
from urllib.parse import parse_qsl
import oauth2
from requests_oauthlib import OAuth1Session

from django.urls import reverse
from django.conf import settings
from django.shortcuts import redirect, render
from rest_framework.views import APIView
from allauth.socialaccount.models import SocialApp
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter, TwitterAPI
from dj_rest_auth.social_serializers import TwitterLoginSerializer
from dj_rest_auth.registration.views import SocialLoginView
from django.views.decorators.csrf import csrf_exempt
from allauth.account.adapter import get_adapter
from rest_framework.authentication import TokenAuthentication
from rest_social_auth.views import SocialSessionAuthView, BaseSocialAuthView
from todo.funcs.serializers import MyUserSerializer, MyUserTokenSerializer
from django.http import *

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


class MySocialView(SocialSessionAuthView):
    serializer_class = MyUserSerializer


class MySocialTokenUserAuthView(BaseSocialAuthView):
    serializer_class = MyUserTokenSerializer
    authentication_classes = (TokenAuthentication, )


class TwitterGetToken(APIView):
    '''
    Initiates Twitter login process
    Requests initial token and redirects user to Twitter
    '''

    def post(self, request, *args, **kwargs):
        request_token_url = 'https://api.twitter.com/oauth/request_token'
        authorize_url = 'https://api.twitter.com/oauth/authorize'

        app = SocialApp.objects.filter(name='Twitter').first()
        if app and app.client_id and app.secret:
            consumer = oauth2.Consumer(app.client_id, app.secret)
            client = oauth2.Client(consumer)

            resp, content = client.request(request_token_url, "GET")
            if resp['status'] != '200':
                raise Exception("Invalid response {}".format(resp['status']))

            request_token = dict(
                urllib.parse.parse_qsl(content.decode("utf-8")))

            twitter_authorize_url = "{0}?oauth_token={1}"\
                .format(authorize_url, request_token['oauth_token'])

            return redirect(twitter_authorize_url)

        raise Exception("Twitter app is not set up")


class TwitterLogin(SocialLoginView):
    '''
    Takes the final twitter access token, secret
    Returns inner django Token
    '''
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter
    authentication_classes = (TokenAuthentication,)
    @csrf_exempt
    def process_login(self):
        get_adapter(self.request).login(self.request, self.user)


class TwitterLogin(SocialLoginView):
    '''
    Takes the final twitter access token, secret
    Returns inner django Token
    '''
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter


class TwitterReceiveView(APIView):
    '''
    Receives Twitter redirect,
    Requests access token
    Uses TwitterLogin to logn and get django Token
    Renders template with JS code which sets django Token to localStorage and redirects to SPA login page
    '''

    def get(self, request, *args, **kwargs):
        access_token_url = 'https://api.twitter.com/oauth/access_token'
        callback_uri = 'http://127.0.0.1:8000/accounts/twitter/login/callback/'

        app = SocialApp.objects.filter(name='Twitter').first()
        client_key = app.client_id
        client_secret = app.secret

        oauth_session = OAuth1Session(client_key,
                                      client_secret=client_secret,
                                      callback_uri=callback_uri)

        redirect_response = request.get_full_path()
        oauth_session.parse_authorization_response(redirect_response)
        token = oauth_session.fetch_access_token(access_token_url)

        params = {'access_token': token['oauth_token'],
                  'token_secret': token['oauth_token_secret']}
        try:
            result = requests.post('http://127.0.0.1:8000/dj-rest-auth/twitter/',
                                   data=params).text
            result = json.loads(result)
        except (requests.HTTPError, json.decoder.JSONDecodeError):
            result = {}
        access_token = result.get('access_token')
        request.session['access_token'] = access_token
        return HttpResponseRedirect('http://127.0.0.1:3000/twitter-login-callback')

        # context = {'access_token': access_token,
        #            'domain': settings.DOMAIN}
        # return render(request, 'account/local_storage_setter.html',
        #               context, content_type='text/html')



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
