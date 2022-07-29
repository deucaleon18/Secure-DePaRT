from django import views
from django.urls import path

from . import views
# from .views import *

urlpatterns = [
    path('', views.checkView, name='check')
]
