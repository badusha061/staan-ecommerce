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
    

class Order(models.Model):

    STATUS_TYPES = (
        ('pending', 'pending'),
        ('shipped', 'shipped'),
        ('cancelled','cancelled'),
        ('completed', 'completed'),
    )
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    status = models.CharField(max_length=20, choices=STATUS_TYPES ,default='pending')
    razorpay_order_id = models.CharField(max_length=100, blank=True, null=True )
    razorpay_payment_id = models.CharField(max_length=100, blank=True, null=True)
    address = models.TextField(null=True,blank=True)
    city = models.CharField(max_length=50,blank=True,null=True)
    state = models.CharField(max_length=50,blank=True,null=True)
    zip = models.CharField(max_length=6,null=True,blank=True)
    def _str_(self):
        return f"Order {self.id} by {self.user.username}"




class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def _str_(self):
        return f"{self.quantity} x {self.product.name} in Order {self.order.id}"


class OrderCancel(models.Model):
    id = models.AutoField(primary_key=True)
    reason = models.TextField()
    order = models.ForeignKey(Order , on_delete=models.CASCADE , null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.order.order.user.username}  {self.reason}"