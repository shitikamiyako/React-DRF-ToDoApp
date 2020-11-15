
from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode as uid_decoder
from django.utils.module_loading import import_string
try:
    from django.utils.translation import gettext_lazy as _
except ImportError:
    from django.utils.translation import ugettext_lazy as _
from rest_framework import exceptions, serializers
from rest_framework.exceptions import ValidationError
from dj_rest_auth.serializers import LoginSerializer


# Get the UserModel
UserModel = get_user_model()

# usernameとpasswordのみでログインしたい場合のシリアライザ
# settings.pyに読み込ませる


class LoginSerializer(LoginSerializer):
    username = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(style={'input_type': 'password'})



    def authenticate(self, **kwargs):
        return authenticate(self.context['request'], **kwargs)

    def _validate_username(self, username, password):
        user = None

        if username and password:
            user = self.authenticate(username=username, password=password)
        else:
            msg = _('Must include "username" and "password".')
            raise exceptions.ValidationError(msg)

        return user

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        user = None

        if 'allauth' in settings.INSTALLED_APPS:
            from allauth.account import app_settings

            # Authentication through username
            if app_settings.AUTHENTICATION_METHOD == app_settings.AuthenticationMethod.USERNAME:
                user = self._validate_username(username, password)

        else:
            # Authentication without using allauth
            if username:
                user = self._validate_username(username, password)

        # Did we get back an active user?
        if user:
            if not user.is_active:
                msg = _('User account is disabled.')
                raise exceptions.ValidationError(msg)
        else:
            msg = _('Unable to log in with provided credentials.')
            raise exceptions.ValidationError(msg)

        # If required, is the email verified?
        # if 'dj_rest_auth.registration' in settings.INSTALLED_APPS:
        #     from allauth.account import app_settings
        #     if app_settings.EMAIL_VERIFICATION == app_settings.EmailVerificationMethod.MANDATORY:
        #         email_address = user.emailaddress_set.get(email=user.email)
        #         if not email_address.verified:
        #             raise serializers.ValidationError(
        #                 _('E-mail is not verified.'))

        attrs['user'] = user
        return attrs
