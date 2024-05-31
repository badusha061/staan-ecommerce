from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
# Create your models here.


class UserModel(AbstractUser):
    otp = models.CharField( max_length=6 , null = True)
    otp_expiry = models.DateTimeField(blank = True,null = True)
    max_otp_try = models.CharField(default = settings.MAX_OTP_TRY , max_length=2)
    otp_time_out = models.DateTimeField(blank = True,null = True)
    is_active = models.BooleanField(default= False)
    email = models.EmailField(unique=True)
    def __str__(self) -> str:
        return self.username