from django.apps import AppConfig
from tensorflow.keras.models import load_model
import html
from pathlib import Path
import os
import h5py
import logging

logger = logging.getLogger("model")

class AppConfig(AppConfig):

    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app'
    
    MODEL_PATH = Path('model')
    lesion_x_model = load_model(MODEL_PATH / 'model1.h5')
    # f = h5py.File(MODEL_PATH / 'lesion_x_model.h5', 'r')
    # print classes in this model
    # logger.debug(f.attrs.get('model_classes'))