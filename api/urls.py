from django.urls import path
from api.views import TodoAPIView

urlpatterns = [
    path('', TodoAPIView.as_view()),
]
