from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

import os
import cv2
import tensorflow as tf
import numpy as np
import keras

from .models import PackageModel, ProductModel
from .forms import PackageModelForm, ProductModelForm
from .serializers import PackageSerializer, ProductSerializer

# Create your views here.
@api_view(['GET','POST'])
def packageView(request):
    # # Form for submitting image
    # form = PackageModelForm
    # if request.method == 'POST':
    #     form = PackageModelForm(request.POST, request.FILES)
    #     if form.is_valid():
    #         data1 = request.POST
    #         files = request.FILES
    #         print("DATA1=",data1)
    #         print("FILES=", files)
    #         form.save()
    #         print("FILE=",form.cleaned_data['image'])

    if request.method == 'GET':
        packages = PackageModel.objects.all()
        serializer = PackageSerializer(packages, many=True)
        print("SERIALIZER=",serializer.data)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = PackageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        print("SERIALIZER=",serializer.data)
        temp = serializer.data['image']
        location = temp[1:]

        # ML Model
        print("ENTER")
        # img = cv2.imread('models/images3.jpeg')
        print(os.listdir())
        img = cv2.imread(location)
        print(location)
        print("Image Loaded")
        resize = tf.image.resize(img, (256,256))
        model = keras.models.load_model('api/packageModel.h5')
        print("Model Loaded")
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
        


def productView(request):

    # # Click picture from camera
    # videoCaptureObject = cv2.VideoCapture(0)
    # result = True
    # while(result):
    #     ret,frame = videoCaptureObject.read()
    #     cv2.imwrite("media/packages/NewPicture.jpg",frame)
    #     result = False
    # videoCaptureObject.release()
    # cv2.destroyAllWindows()

    print("ENTER")
    print(os.listdir())
    img = cv2.imread('media/packages/NewPicture.jpg')
    print("Image Loaded")
    resize = tf.image.resize(img, (256,256))
    model = keras.models.load_model('api/productModel.h5')
    print("Model Loaded")
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



