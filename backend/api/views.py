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

def packageView(request):
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

    #     # def predict(self):
    #         print("ENTER")
    #         # img = cv2.imread('models/images3.jpeg')
    #         print(os.listdir('media/'))
    #         img = cv2.imread("media/packages/"+str(form.cleaned_data['image']))
    #         print('media/packages'+str(form.cleaned_data['image']))
    #         print("Image Loaded")
    #         resize = tf.image.resize(img, (256,256))
    #         model = keras.models.load_model('api/packageModel.h5')
    #         print("Model Loaded")
    #         yhat = model.predict(np.expand_dims(resize/255, 0))
    #         print("YHAT=",type(yhat))
    #         temp = 0
    #         for i in yhat:
    #             temp = i[0]
    #             print(temp)
    #         if temp > 0.5: 
    #             print(f'Predicted class is Intact')
    #             # return HttpResponse("True")
    #             value = "True"
    #         else:
    #             print(f'Predicted class is Damaged')
    #             # return HttpResponse("False")
    #             value = "False"

    #         return HttpResponse(value)
    # context = {'form':form}
    # return render(request, 'api/check.html', context)

    print("ENTER")
    print(os.listdir())
    # img = cv2.imread('media/packages/NewPicture.jpg')
    img = cv2.imread('models/shashank.jpeg')
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
    videoCaptureObject = cv2.VideoCapture(0)
    result = True
    while(result):
        ret,frame = videoCaptureObject.read()
        cv2.imwrite("media/packages/NewPicture.jpg",frame)
        result = False
    videoCaptureObject.release()
    cv2.destroyAllWindows()

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



