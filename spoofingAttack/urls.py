from django.urls import path
from . import views

app_name = 'spoofingAttack'

urlpatterns = [
           path('', views.home, name = 'home'),
           path('know', views.know, name = 'know'  ),
           path('nowhere', views.nowhere, name = 'nowhere'),
           path('goToFacebook', views.goToFacebbok, name = 'facebook'),
        

     
     
     
     ]
