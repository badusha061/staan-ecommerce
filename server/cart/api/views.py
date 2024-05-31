from rest_framework.views import APIView
from .serializers import CartItemSerializer
from rest_framework.generics import ListCreateAPIView
from cart.models import CartItem
from user_auth.models import UserModel
from product.models import Product
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST , HTTP_201_CREATED , HTTP_200_OK

class ListCart(APIView):
    def get(self,reqeuest, user_id):
        try:
            cart_instance = CartItem.objects.filter(user = user_id)
            serilzer_data = CartItemSerializer(cart_instance , many=True)
            print(serilzer_data)
            return Response(status= HTTP_200_OK , data= serilzer_data.data)
        except Exception as e:
            message = {
                "message":"User Does Not have the Cart"
            }
            return Response(status= HTTP_400_BAD_REQUEST)


class CreateCart(APIView):
    def post(self,request,user_id):
        user = self.kwargs['user_id']
        product = request.data.get('product')
        try:
            user_instance = UserModel.objects.get(id = user)
        except Exception as e:
            message = {
                "message":"User Does Not Exists"
            }
            return Response(status=HTTP_400_BAD_REQUEST,data=message)
        try:
            product_instace = Product.objects.get(id = product)
        except Exception as e:
            message = {
                "message":"Product Deos not Exists"
            }
            return Response(status=HTTP_400_BAD_REQUEST,data=message)
        check_user = CartItem.objects.filter(user = user , product = product).exists()
        if check_user:
            message = {
                "message":"Product is Already existed in the Cart"
            }
            return Response(status= HTTP_400_BAD_REQUEST,data=message)
        else:

            CartItem.objects.create(user = user_instance , product = product_instace , quantity = 1 , total_price= product_instace.price )
            message = {
                "message":"Succesfully Added into Cart"
            }
            return Response(status=HTTP_201_CREATED , data=message)



class UpdateCart(APIView):
    def put(self,request,user_id):
        user_action = request.data.get('action')
        if  user_action is None:
            message= {
                "message":"User no cart action"
            }
            return Response(status= HTTP_400_BAD_REQUEST , data= message )
        try:
            user_instance = UserModel.objects.get(id = user_id)
        except Exception as e:
            message = {
                "message":"User Does Not Exists"
            }
            return Response(status=HTTP_400_BAD_REQUEST,data=message)
        product = request.data.get('product')
        try:
            product_instace = Product.objects.get(id = product)
        except Exception as e:
            message = {
                "message":"Product Deos not Exists"
            }
            return Response(status=HTTP_400_BAD_REQUEST,data=message)
        try:
            cart_instance = CartItem.objects.get(product = product_instace , user = user_instance)
        except Exception as e:
            message = {
                "message":"Cart Items Deos not Exists"
            }
            return Response(status=HTTP_400_BAD_REQUEST,data=message)
        else:
            if user_action == 'increase':
                product_qunatity = product_instace.quantity
                user_quantity = cart_instance.quantity 
                user_total_price = cart_instance.total_price
                total_user_quntity = user_quantity + 1 
                if product_qunatity < total_user_quntity:
                    message = {
                        "message":"product Limited Quantity"
                    }
                    return Response(status= HTTP_400_BAD_REQUEST , data=message)
                cart_instance.quantity = user_quantity + 1 
                cart_instance.save()
                message= {
                    "message":"Successully Updated Cart"
                }
                return Response(status= HTTP_200_OK , data= message )
            elif user_action == 'decrease':
                user_quantity = cart_instance.quantity 
                if user_quantity == 1:
                    message = {
                        "message":"Qunitity is One cannot be change"
                    }
                    return Response(status= HTTP_400_BAD_REQUEST , data=message)
                cart_instance.quantity = user_quantity - 1 
                cart_instance.save()

                message= {
                    "message":"Successully Updated Cart"
                }
                return Response(status= HTTP_200_OK ,data= message)