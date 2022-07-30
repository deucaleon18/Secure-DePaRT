# import .packagechecker as pc
import os, sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from packageCheck import Package

obj = Package()
obj.create_and_train_model()
print(obj.predict())

# print(os.listdir("./backend/models/data"))