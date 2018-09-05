#!/usr/local/bin/python
import cv2
import numpy as np
import os

name = "notes-haskell-laziness.jpg"

img = cv2.imread(name)
width, height = img.shape[:2]
gray = cv2.imread(name, 0)
kernel = np.ones((3, 3),np.uint8)
gray = cv2.morphologyEx(gray, cv2.MORPH_OPEN, kernel)
ret,thresh = cv2.threshold(gray, 90, 255, cv2.THRESH_BINARY)
thresh = cv2.medianBlur(thresh, 3)
cv2.imwrite('temp.jpg', thresh)
img2 = cv2.imread('temp.jpg')
dst = cv2.addWeighted(img, 0.8, img2, 0.2, 0)
try:
    os.remove('temp.jpg')
except: pass

cv2.imwrite('output_' + name, dst)
