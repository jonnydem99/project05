from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.home, name="home"),
    path('home/', views.home, name="home"),
    path('submitquestion', views.submitquestion, name="submitquestion"),
    path('add_question', views.add_question, name="add_question"),
    path('add_answer/<content>,<category>', views.add_answer, name="add_answer"),
    path('test', views.test, name="test"),
]