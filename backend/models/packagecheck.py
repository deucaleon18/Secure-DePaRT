import tensorflow as tf
# import * as tf from "tensorflow"

import os
import cv2
import imghdr
import numpy as np
from matplotlib import pyplot as plt
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Dense, Flatten, Dropout
from tensorflow.keras.metrics import Precision, Recall, BinaryAccuracy
import joblib
import keras


# Avoid OOM errors by setting GPU Memory Consumption Growth
# gpus = tf.config.experimental.list_physical_devices('GPU')
# for gpu in gpus: 
#     tf.config.experimental.set_memory_growth(gpu, True)

import sys
data_dir = "backend/models/data"
# data_dir = str(os.path.join(sys.path[0], "data"))

class Package:
    
    def get_model(self):
        
        model = Sequential()
        # model = tf.keras.models.Sequential([tf.keras.layers.Dense(1)])
        print("Inside get_model")

        model.add(Conv2D(16, (3,3), 1, activation='relu', input_shape=(256,256,3)))
        print("Conv2D added")
        model.add(MaxPooling2D())
        model.add(Conv2D(32, (3,3), 1, activation='relu'))
        model.add(MaxPooling2D())
        model.add(Conv2D(16, (3,3), 1, activation='relu'))
        model.add(MaxPooling2D())
        model.add(Flatten())
        model.add(Dense(256, activation='relu'))
        model.add(Dense(1, activation='sigmoid'))

        model.compile('adam', loss=tf.losses.BinaryCrossentropy(), metrics=['accuracy'])
        
        return model

    def get_dataset(self):

        image_exts = ['jpeg','jpg','bmp', 'png']
        for image_class in os.listdir(data_dir): 
            for image in os.listdir(os.path.join(data_dir, image_class)):
                image_path = os.path.join(data_dir, image_class, image)
                try: 
                    img = cv2.imread(image_path)
                    tip = imghdr.what(image_path)
                    if tip not in image_exts: 
                        print('Image not in ext list {}'.format(image_path))
                        os.remove(image_path)
                except Exception as e: 
                        print('Issue with image {}'.format(image_path))
                        # os.remove(image_path)
        data = tf.keras.utils.image_dataset_from_directory(data_dir)
        data_iterator = data.as_numpy_iterator()
        batch= data_iterator.next()

        data = data.map(lambda x,y: (x/255, y))
        return data,data_iterator,batch

    def process_dataset(self):
        data,_,_=self.get_dataset()
        print("Data=",data)

        train_size = int(len(data)*.7)
        val_size = int(len(data)*.2)
        test_size = int(len(data)*.1)+1
        # dataset = tf.data.Dataset.range(100)
        # dataset = dataset.take(3)
        print("TYPE=",data)
        # dataset= data.values
        train = data.take(train_size)
        val = data.skip(train_size).take(val_size)
        test = data.skip(train_size+val_size).take(test_size)
        # print("Dataset=",dataset)
        print("Train =", train, "Val =", val, "Test =", test)
        return train,val,test

    def create_and_train_model(self):
        print("hello")
        train,val,test=self.process_dataset()
        print("Traning model")
        model = self.get_model()
        print("Model created")
        print("TRAIN =", train,"VAL =", val, "test =", test)
        hist = model.fit(train, epochs=20, validation_data=val)
        # joblib.dump(hist, 'backend/models/packageModel.joblib')
        model.save('backend/models/packageModel.h5')
        
    def evaluate(self):
        # model = joblib.load('backend/models/packageModel.joblib')
        model = keras.models.load_model('backend/models/packageModel.h5')
        batch=self.get_dataset()
        # model=self.get_model()
        pre = Precision()
        re = Recall()
        acc = BinaryAccuracy()
        for batch in test.as_numpy_iterator(): 
            X, y = batch
            yhat = model.predict(X)
            pre.update_state(y, yhat)
            re.update_state(y, yhat)
            acc.update_state(y, yhat)
            print(pre.result(), re.result(), acc.result())

    def predict(self):
        img = cv2.imread('backend/models/image14.jpeg')
        print("IMG=",img)
        resize = tf.image.resize(img, (256,256))
        # model=self.get_model()
        # model = joblib.load('backend/models/packageModel.joblib')
        model = keras.models.load_model('backend/models/packageModel.h5')
        yhat = model.predict(np.expand_dims(resize/255, 0))
        print("YHAT=",type(yhat))
        temp = 0
        for i in yhat:
            temp = i[0]
            print(temp)
        if temp > 0.5: 
            print(f'Predicted class is Intact')
            return True
        else:
            print(f'Predicted class is Damaged')
            return False
