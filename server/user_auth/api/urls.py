from django.urls import path
from .views import * 
from rest_framework_simplejwt.views import (
   TokenRefreshView,
)
urlpatterns = [
    path('token', CustomerTokenObtainPairView.as_view(), name='access-token'),
    path('token/refersh', TokenRefreshView.as_view(), name='refersh-token'),
    path('verify_otp/', verify_otp.as_view(), name='otp-verfication'),
    path('generate_otp/', generate_otp.as_view(), name='generate-otp'),
]
