from django import views
from django.urls import path

from . import views
# from .views import *

urlpatterns = [
    path('packagePredict/', views.packageView, name='packagePredict'),
    path('productPredict/', views.productView, name='productPredict'),
]
