from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField

from .models import PackageModel, ProductModel


class PackageSerializer(serializers.ModelSerializer):
    image=Base64ImageField() # From DRF Extra Fields
    class Meta:
        model = PackageModel
        fields = ['name', 'image']

    def create(self, validated_data):
        image=validated_data.pop('image')
        name=validated_data.pop('name')
        return PackageModel.objects.create(name=name,image=image)

class ProductSerializer(serializers.ModelSerializer):
    image=Base64ImageField() # From DRF Extra Fields
    class Meta:
        model = ProductModel
        fields = ['name', 'image']