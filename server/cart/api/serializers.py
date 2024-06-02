from rest_framework.serializers import ModelSerializer
from cart.models import  CartItem , Order , OrderItem
from product.api.serializers import ProductSerailzers
from product.api.serializers import  ProductSerailzers
from user_auth.api.serializers import UserSerializer

class CartItemSerializer(ModelSerializer):
    product = ProductSerailzers()
    class Meta:
        model = CartItem
        fields = ['id','product','user','quantity','date_added','total_price']




class OrderSerializer(ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Order
        fields = ['id', 'user', 'created_at', 'total_price', 'status', 'razorpay_order_id','address','city','state','zip']


class OrderItemSerializer(ModelSerializer):
    order = OrderSerializer()
    product = ProductSerailzers()   
    class Meta:
        model = OrderItem
        fields = ['id','order','product', 'quantity', 'price']