from django.views.generic import TemplateView
from django.contrib import admin
from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from dj_rest_auth.registration.views import VerifyEmailView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt
from .views import index


API_TITLE = 'ToDo APP on React+DRF  API'
API_DESCRIPTION = 'A Web API for creating and edit Todo Post'
schema_view = get_schema_view(
    openapi.Info(
        title="Snippets API",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('', index, name='index'),
    path('admin/', admin.site.urls),
    path('todo/', include('todo.urls')),
    path('category/', include('category.urls')),
    path('user/', include('users.urls')),
    path('accounts/', include('allauth.urls')),
    path('api-auth/', include('rest_framework.urls')),
    # path('dj-rest-auth/', include('users.signin.urls')),
    url(r'^dj-rest-auth/', include('dj_rest_auth.urls')),  # jwt用
    # path('dj-rest-auth/registration/', include('users.registration.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')), # jwt用
    path('dj-rest-auth/account-confirm-email/', VerifyEmailView.as_view(),
         name='account_email_verification_sent'),
    path('docs/', include_docs_urls(title=API_TITLE,
                                    description=API_DESCRIPTION)),
    url(r'^swagger(?P<format>\.json|\.yaml)$',
        schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger',
                                           cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc',
                                         cache_timeout=0), name='schema-redoc'),
]
