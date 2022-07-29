from distutils.command.upload import upload
from pyexpat import model
from django.db import models

# Create your models here.

class PackageModel(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='packages')
    isDamaged = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class ProductModel(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='products')
    isDamaged = models.BooleanField(default=False)

    def __str__(self):
        return self.name
