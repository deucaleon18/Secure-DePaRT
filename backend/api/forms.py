from django.forms import ModelForm

from .models import PackageModel, ProductModel

class PackageModelForm(ModelForm):
    class Meta:
        model = PackageModel
        fields = '__all__'

class ProductModelForm(ModelForm):
    class Meta:
        model = ProductModel
        fields = '__all__'