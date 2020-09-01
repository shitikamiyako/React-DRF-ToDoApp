from django.views.generic import TemplateView
from django.contrib import admin
from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from dj_rest_auth.registration.views import VerifyEmailView
from rest_framework_swagger.views import get_swagger_view


API_TITLE = 'ToDo APP on React+DRF  API'
API_DESCRIPTION = 'A Web API for creating and edit Todo Post'
schema_view = get_swagger_view(title=API_TITLE)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('todo/', include('todo.urls')),
    path('user/', include('users.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('dj-rest-auth/account-confirm-email/', VerifyEmailView.as_view(),
         name='account_email_verification_sent'),
    path('docs/', include_docs_urls(title=API_TITLE,
                                    description=API_DESCRIPTION)),
    path('swagger-docs/', schema_view)
]
