from django.db import models
from product.models import Product
from user_auth.models import UserModel
from decimal import Decimal
# Create your models here.

class CartItem(models.Model):
    id =  models.AutoField(primary_key=True)
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    user = models.ForeignKey(UserModel,on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0)
    date_added = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10,decimal_places=2,default=Decimal('0.00'),null=True,blank=True)

    def __str__(self) -> str:
        return f"{self.quantity}  {self.product.name}"