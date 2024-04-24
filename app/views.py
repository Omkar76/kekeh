from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from .apps import AppConfig 

# Create your views here.
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from PIL import Image
import numpy as np
import logging
logger = logging.getLogger("model")
from django import forms


from django.http import HttpResponseRedirect
from django.shortcuts import render

def index(request):
    return render(request, 'index.html')


def handle_uploaded_file(f):
    with open("kekeh.jpg", "wb+") as destination:
        for chunk in f.chunks():
            destination.write(chunk)

from django.views.decorators.csrf import csrf_exempt, csrf_protect

@csrf_exempt
def upload_file(request):
    if request.method == "POST":
        # logger.debug(request.FILES)
        handle_uploaded_file(request.FILES.get("file"))
        image = Image.open('ISIC_0029385...".jpg').resize((125, 100))
        image = np.array(image)
        image = image/255.0
        image = image.reshape(1, 100, 125, 3)
        #        b'Melanocytic nevi', b'Basal cell carcinoma', b'Melanoma',
        #        b'Actinic keratoses', b'Vascular lesions',
        #        b'Benign keratosis-like lesions ', b'Dermatofibroma'


        SKIN_CLASSES = {
            0: 'akiec, Actinic Keratoses (Solar Keratoses) or intraepithelial Carcinoma (Bowen’s disease)',
            1: 'bcc, Basal Cell Carcinoma',
            2: 'bkl, Benign Keratosis',
            3: 'df, Dermatofibroma',
            4: 'mel, Melanoma',
            5: 'nv, Melanocytic Nevi',
            6: 'vasc, Vascular skin lesion'
        };
        response = AppConfig.lesion_x_model.predict(image)
        # logger.debug(response)
        # returning JSON response   
        return JsonResponse({}, safe=False)



class call_model(APIView):
    def get(self,request):
        if request.method == 'GET':
            
            # sentence is the query we want to get the prediction for
            # params =  request.GET.get('sentence')
            
            # predict method used to get the prediction
            # response = AppConfig.lesion_x_model.predict()
        
            # REad image and convert to numpy array

            # image = Image.open('images/kekeh.jpg').resize((125, 100))
            # image = np.array(image)
            # image = image/255.0
            # image = image.reshape(1, 100, 125, 3)
            # #        b'Melanocytic nevi', b'Basal cell carcinoma', b'Melanoma',
            # #        b'Actinic keratoses', b'Vascular lesions',
            # #        b'Benign keratosis-like lesions ', b'Dermatofibroma'

            # response = AppConfig.lesion_x_model.predict(image)
            # prediction = response.tolist()[0]
            # lesion_type_dict = {
            #     'nv': 'Melanocytic nevi',
            #     'mel': 'Melanoma',
            #     'bkl': 'Benign keratosis-like lesions ',
            #     'bcc': 'Basal cell carcinoma',
            #     'akiec': 'Actinic keratoses',
            #     'vasc': 'Vascular lesions',
            #     'df': 'Dermatofibroma'
            # }
            # result = zip(lesion_type_dict.values(), prediction)





            # # logger.debug(response)
            # # returning JSON response
            return JsonResponse(list([1,2,3]), safe=False)
