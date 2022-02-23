from django.db import models

# Create your models here.
class Credential(models.Model):
      email = models.CharField(max_length=200)
      password = models.CharField(max_length = 200)
      created_on = models.DateTimeField(auto_now_add = True)
      updated_on = models.DateTimeField(auto_now =True)
      
