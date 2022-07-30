import os, sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from productCheck import Package

# obj = Package()
# obj.create_and_train_model()
# print(obj.predict())

import cv2

videoCaptureObject = cv2.VideoCapture(0)
result = True
while(result):
    ret,frame = videoCaptureObject.read()
    cv2.imwrite("NewPicture.jpg",frame)
    result = False
videoCaptureObject.release()
cv2.destroyAllWindows()