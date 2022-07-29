from django.http import HttpResponse
from django.shortcuts import render

import os
import cv2
import tensorflow as tf
import numpy as np
import keras

from .models import PackageModel, ProductModel
from .forms import PackageModelForm, ProductModelForm

# Create your views here.

def checkView(request):
    form = PackageModelForm
    if request.method == 'POST':
        form = PackageModelForm(request.POST, request.FILES)
        if form.is_valid():
            data1 = request.POST
            image = request.FILES
            data = form.cleaned_data['image']
            print("DATA1=",data1)
            print("IMAGE=", image)
            print("DATA=", data)
            form.save()

        # def predict(self):
            print("ENTER")
            img = cv2.imread('backend/models/image14.jpeg')
            print("Image Loaded")
            print("IMG=",img)
            resize = tf.image.resize(img, (256,256))
            model = keras.models.load_model('backend/api/packageModel.h5')
            yhat = model.predict(np.expand_dims(resize/255, 0))
            print("YHAT=",type(yhat))
            temp = 0
            for i in yhat:
                temp = i[0]
                print(temp)
            if temp > 0.5: 
                print(f'Predicted class is Intact')
                # return HttpResponse("True")
                value = "True"
            else:
                print(f'Predicted class is Damaged')
                # return HttpResponse("False")
                value = "False"

            return HttpResponse(value)
    context = {'form':form}
    return render(request, 'api/check.html', context)

