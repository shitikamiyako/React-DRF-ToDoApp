from django.urls import path,re_path
from . import views


urlpatterns = [
    re_path(r'^$', views.index, name='index_page'),
    re_path(r'^(?:.*)/?$', views.index, name="other_page"),
]
