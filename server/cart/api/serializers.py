from rest_framework.serializers import ModelSerializer
from cart.models import  CartItem


class CartItemSerializer(ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id','product','user','quantity','date_added','total_price']