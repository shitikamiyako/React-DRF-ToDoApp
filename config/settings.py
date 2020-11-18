"""
Django settings for config project.

Generated by 'django-admin startproject' using Django 3.0.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

from corsheaders.defaults import default_headers
from datetime import timedelta
import os
from dotenv import load_dotenv
import django_heroku
import dj_database_url

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
DEBUG = False


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/


# General Settings
# ALLOWED_HOSTS = ['127.0.0.1', '.herokuapp.com', 'localhost']
ALLOWED_HOSTS = ['*']
REACTION_OPTION = ["Like", "Unlike"]
REACT_APP_DIR = os.path.join(BASE_DIR, 'frontend')

# Application definition

INSTALLED_APPS = [
    # local
    'app.users.apps.UsersConfig',
    'app.todo.apps.TodoConfig',
    'app.category.apps.CategoryConfig',
    'app.url_checker.apps.UrlCheckerConfig',

    # 3rd party
    'rest_framework',
    'allauth',  # django-allauth
    'allauth.account',  # django-allauth
    'allauth.socialaccount',  # django-allauth
    'allauth.socialaccount.providers.twitter',  # django-allauth
    'dj_rest_auth.registration',  # django-allauth
    'dj_rest_auth', # API Authentication
    'corsheaders',
    'django_filters',
    'django_heroku',
    'whitenoise.runserver_nostatic',  # < As per whitenoise documentation
    'gunicorn',
    'drf_yasg',
    'psycopg2',
    'coreapi',
    'drf_firebase_auth', # DRF+Firebase TokenAuthentication


    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # CORS middlewares
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                # 'social_django.context_processors.backends',
                # 'social_django.context_processors.login_redirect',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'name',
        'USER': 'user',
        'PASSWORD': '',
        'HOST': 'host',
        'PORT': '',
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'ja'

TIME_ZONE = 'Asia/Tokyo'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
# STATIC_ROOT = os.path.join(BASE_DIR, 'build', 'static')
STATICFILES_DIRS = [
    os.path.join(REACT_APP_DIR, 'build', 'static'),
]

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'build', 'media')
AUTH_USER_MODEL = 'users.CustomUser'

# Session Config
SESSION_EXPIRE_AT_BROWSER_CLOSE = False # ブラウザを閉じてもセッションを破棄しない
SESSION_COOKIE_AGE = 86400 # 1日経ったら強制的にセッションタイムアウト


# DRF settings

REST_FRAMEWORK = {
    'DATETIME_FORMAT': '%Y-%m-%d %H:%M',
    'DEFAULT_PAGINATION_CLASS': 'todo.funcs.paginations.CustomPagination',
    'PAGE_SIZE': 10,

    # 'DEFAULT_PERMISSION_CLASSES': [
    #     'rest_framework.permissions.IsAuthenticated',
    # ],

    'DEFAULT_AUTHENTICATION_CLASSES': [  # 追加
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        # 'drf_firebase_auth.authentication.FirebaseAuthentication',
        # 'knox.auth.TokenAuthentication', # knox
        # 'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
        # 'rest_framework_social_oauth2.authentication.SocialAuthentication',
        'dj_rest_auth.jwt_auth.JWTCookieAuthentication',  # Django REST Framework JWT
    ],

    # 'NON_FIELD_ERRORS_KEY': 'detail',  # Django REST Framework JWT
    # 'TEST_REQUEST_DEFAULT_FORMAT': 'json',  # Django REST Framework JWT

    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
    ),
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema'
}
# SESSION_COOKIE_SAMESITE = 'None'
# CSRF_COOKIE_SAMESITE = 'None'
# SESSION_COOKIE_SECURE = True


# dj-rest-auth settings

REST_AUTH_SERIALIZERS = {
    'LOGIN_SERIALIZER': 'users.signin.serializers.LoginSerializer',
    'USER_DETAILS_SERIALIZER': 'users.funcs.serializers.CustomUserDetailsSerializer',
}

CSRF_COOKIE_NAME = "csrftoken"
# CSRF_USE_SESSIONS = True

# REST_SESSION_LOGIN = False

REST_USE_JWT = True
JWT_AUTH_COOKIE = 'jwt-auth'
OLD_PASSWORD_FIELD_ENABLED = True
## httpsでのリクエストでないとCookieを送信しない(デフォルトはfalse。本番でTrueにする)
JWT_AUTH_SECURE = True
# JWT_AUTH_SAMESITE = 'None'
## JWTクッキーを認証に使用する際にDRFで無効になっているCSRFチェックを有効にする。
# JWT_AUTH_COOKIE_ENFORCE_CSRF_ON_UNAUTHENTICATED = True


# django-allauth settings
AUTHENTICATION_BACKENDS = (
    'allauth.account.auth_backends.AuthenticationBackend',
    'django.contrib.auth.backends.ModelBackend',
)


# LOGIN_REDIRECT_URL = 'http://127.0.0.1:3000/twitter-login-callback'
ACCOUNT_AUTHENTICATION_METHOD = "username"
ACCOUNT_EMAIL_VERIFICATION = "none"
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
SITE_ID = 1

# django-rest=simpole-jwt settings

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(minutes=60),
}


# CORS setting

CORS_ALLOWED_ORIGINS = (
    'http://localhost:3000',
    'http://localhost:8000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:8000',
    'https://api.twitter.com',
    'https://react-drf-todo-app.herokuapp.com',

)

CSRF_TRUSTED_ORIGINS = [
    'localhost:3000',
    '127.0.0.1:3000',
    'api.twitter.com',
    'react-drf-todo-app',
    'react-drf-todo-app.herokuapp.com',
    'herokuapp.com',
]


CORS_ALLOW_HEADERS = list(default_headers) + [
    'X-CSRFTOKEN',
]

CORS_ALLOW_CREDENTIALS = True
# CORS_ORIGIN_ALLOW_ALL = True

# DRF Firebase settings

DRF_FIREBASE_AUTH = {
    'FIREBASE_SERVICE_ACCOUNT_KEY': './config/env/serviceAccountKey.json'
}

# heroku settings
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
DEBUG = False


try:
    from .local_settings import *
except ImportError:
    pass

if not DEBUG:
    load_dotenv()
    SECRET_KEY = os.environ['SECRET_KEY']
    CSRF_COOKIE_SECURE = 'True'
    SECURE_REFERRER_POLICY = 'origin'
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    import django_heroku
    django_heroku.settings(locals())
    db_from_env = dj_database_url.config(conn_max_age=600, ssl_require=True)
    DATABASES['default'].update(db_from_env)
