from rest_framework.views import APIView
from .serializers import CartItemSerializer , OrderItemSerializer , OrderSerializer
from rest_framework.generics import ListCreateAPIView
from cart.models import CartItem , Order , OrderItem
from user_auth.models import UserModel
from product.models import Product
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST , HTTP_201_CREATED , HTTP_200_OK
from rest_framework import status
from django.db import transaction
import razorpay
from django.conf import settings
from datetime import date, datetime, timedelta
from django.db.models import Q
from product.api.serializers import ProductSerailzers
from cart.models import OrderCancel


class ListCart(APIView):
    def get(self,reqeuest, user_id):
        try:
            cart_instance = CartItem.objects.filter(user = user_id)
            serilzer_data = CartItemSerializer(cart_instance , many=True)
            all_total_pirce = 0
            for cart in cart_instance:
                all_total_pirce += cart.total_price
            response_data  = {
                'data':serilzer_data.data,
                'total' : all_total_pirce
            }
            return Response(status= HTTP_200_OK , data= response_data)
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
                cart_instance.total_price = user_total_price + product_instace.price
                cart_instance.save()
                message= {
                    "message":"Successully Updated Cart"
                }
                return Response(status= HTTP_200_OK , data= message )
            elif user_action == 'decrease':
                user_quantity = cart_instance.quantity 
                user_total_price = cart_instance.total_price
                if user_quantity == 1:
                    message = {
                        "message":"Qunitity is One cannot be change"
                    }
                    return Response(status= HTTP_400_BAD_REQUEST , data=message)
                cart_instance.quantity = user_quantity - 1 
                cart_instance.total_price = user_total_price - product_instace.price
                cart_instance.save()

                message= {
                    "message":"Successully Updated Cart"
                }
                return Response(status= HTTP_200_OK ,data= message)
 
 
class DeleteCartItem(APIView):
    def delete(self,request,cart_id):
        try:
            CartItem.objects.get(id = cart_id).delete()
            message = {
                "message":"Successfully Deleted Cart Item"
            }
            return Response(status=HTTP_200_OK , data= message) 
        except Exception as e:
            message = {
                "message":"Cart Items not Found"
            }
            return Response(status=HTTP_400_BAD_REQUEST,data=message)
        


class CreateOrder(APIView):
    def post(self,request,user_id):

        address = request.data['values']['address']
        city = request.data['values']['city']
        state = request.data['values']['state']
        zip = request.data['values']['zip']
        try:
            user_instance = UserModel.objects.get(id = user_id)
        except Exception as e:
            message = {
                "message":"User Does Not Exists"
            }
            return Response(status=HTTP_400_BAD_REQUEST,data=message)
        try:
            cart_instance = CartItem.objects.filter(user = user_instance)
        except Exception as e:
            message = {
                "message":"User  Deos not Exists Products"
            }
            return Response(status=HTTP_400_BAD_REQUEST,data=message)
        
        total_price = 0
        for cart in cart_instance:
            total_price += cart.total_price
        order = Order.objects.create(user = user_instance , total_price = total_price , address=address , state=state,city=city,zip=zip)
        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        total_price_in_paise = int(total_price * 100)
        razorpay_order = client.order.create({
            'amount': total_price_in_paise,  
            'currency': 'INR',
            'payment_capture': '1'
        })
        order.razorpay_order_id = razorpay_order['id']
        order.save()
        serilazer = {
            "razorpay_order_id":razorpay_order['id']
        }
        return Response(status=status.HTTP_201_CREATED , data= serilazer)
    



class VerifyPaymentView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            user_instance = UserModel.objects.get(id = self.kwargs['user_id'])
        except Exception as e:
            message = {
                "message":"User Does Not Exists"
            }
            return Response(status=HTTP_400_BAD_REQUEST,data=message)
        try:
            cart_instance = CartItem.objects.filter(user = user_instance)
        except Exception as e:
            message = {
                "message":"User  Deos not Exists Products"
            }
            return Response(status=HTTP_400_BAD_REQUEST,data=message)
    
        payload = request.data
        razorpay_order_id = payload['razorpay_order_id']
        razorpay_payment_id = payload['razorpay_payment_id']
        razorpay_signature = payload['razorpay_signature']

        order = Order.objects.get(razorpay_order_id=razorpay_order_id)

        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        params_dict = {
            'razorpay_order_id': razorpay_order_id,
            'razorpay_payment_id': razorpay_payment_id,
            'razorpay_signature': razorpay_signature
        }

        try:
            client.utility.verify_payment_signature(params_dict)    
            for item in cart_instance:
                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    quantity=item.quantity,
                    price=item.total_price
                )
                product = item.product
                product.quantity -= item.quantity
                product.save()
            
            cart_instance.delete()
            order.status = 'completed'
            order.razorpay_payment_id = razorpay_payment_id
            order.save()
            return Response({'status': 'Payment successful'}, status=status.HTTP_200_OK)
        except razorpay.errors.SignatureVerificationError:
            order.status = 'failed'
            order.save()
            return Response({'status': 'Payment failed'}, status=status.HTTP_400_BAD_REQUEST)



class RecendOrder(APIView):
    def get(self,request):
        products = Product.objects.all().order_by('-id')[:3]
        serizer_products = ProductSerailzers(products,many=True)
        recend_order = OrderItem.objects.all().order_by('-id')[:5]
        serizer_recend_order = OrderItemSerializer(recend_order,many=True)
        current_date = date.today()
        orders  = Order.objects.all()
        first_day_of_month = current_date.replace(day=1)
        if current_date.month == 12:
            last_day_of_month = current_date.replace(year=current_date.year + 1, month=1, day=1) - timedelta(days=1)
        else:
            last_day_of_month = current_date.replace(month=current_date.month + 1, day=1) - timedelta(days=1)

     
        year, week_num, day_of_week = current_date.isocalendar()
        first_day_of_week = current_date - timedelta(days=day_of_week - 1)
        last_day_of_week = first_day_of_week + timedelta(days=6)
        total_month_sales_instance = Order.objects.filter(created_at__range=(first_day_of_month, last_day_of_month))
        total_week_sales_instance = Order.objects.filter(created_at__range=(first_day_of_week, last_day_of_week))
        total_sales = 0
        for order in orders:
            total_sales += order.total_price
        total_month_sales = 0 
        for order in total_month_sales_instance:
            total_month_sales += order.total_price
        total_week_sales = 0
        for order in total_week_sales_instance:
            total_week_sales += order.total_price
        percentage_month_sales = total_month_sales // total_sales * 100
        percentage_week_sales = total_week_sales // total_sales * 100
    
        response_data = {
            'total_month_sales_count': total_month_sales_instance.count(),
            'total_week_sales_count': total_week_sales_instance.count(),
            'recend_order':serizer_recend_order.data,
            'total_month_sales':total_month_sales,
            'total_week_sales':total_week_sales,
            'percentage_month_sales':percentage_month_sales,
            'percentage_week_sales':percentage_week_sales,
            'products':serizer_products.data
        }
        return Response(status=status.HTTP_200_OK , data=response_data)



class OrderHistory(APIView):
    def get(self,request):
        data = OrderItem.objects.all()
        serizer_data = OrderItemSerializer(data , many=True)
        return Response(data=serizer_data.data , status=status.HTTP_200_OK)


class UserOrderHistory(APIView):
    def get(self,request,*args,**kwargs):
        user_id = self.kwargs['user_id']
        if user_id is None:
            message = {
                "message":"User Not found"
            }
            return Response(status= status.HTTP_400_BAD_REQUEST,data=message)
        
        try:
            user_instance = UserModel.objects.get(id = self.kwargs['user_id'])
        except Exception as e:
            message = {
                "message":"User Does Not Exists"
            }
            return Response(status=HTTP_400_BAD_REQUEST,data=message)
        try:
            order_items_instance = Order.objects.filter(user = user_instance).order_by('-id')
        except Exception as e:
            message = {
                "message":"Order Items Does Not Exists"
            }
            return Response(status=HTTP_400_BAD_REQUEST,data=message)
        serilzer_data = OrderSerializer(order_items_instance , many=True)
        return Response(data= serilzer_data.data,status=status.HTTP_200_OK)
        

class UserOrderIndivualHistory(APIView):
    def get(self,request,*args,**kwargs):
        order_id = self.kwargs['order_id']
        print(order_id)
        if order_id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            order_items_instance = OrderItem.objects.filter(order = order_id).order_by('-id')
        except Exception as e:
            message = {
                "message":"Order Items Does Not Exists"
            }
            return Response(status=HTTP_400_BAD_REQUEST,data=message)     
        serializer_data = OrderItemSerializer(order_items_instance , many=True)
        total = 0 
        for i in order_items_instance:
            total += i.price
        response_data ={
            'order':serializer_data.data,
            'total':total
        }
        return Response(status=status.HTTP_200_OK , data=response_data)



class CancelOrder(APIView):
    def put(self,request,*args,**kwargs):
        order_id = self.kwargs['order_id']
        reason = request.data['reason']
        if  reason is None:
            message = {
                "message":"Reason Must be needed"
            }
            return Response(status=status.HTTP_400_BAD_REQUEST , data=message)
        try:
            order_instance = Order.objects.get( id = order_id)
        except Exception as e:
            message = {
                "message":"Order Does Not Exists"
            }
            return Response(status=HTTP_400_BAD_REQUEST,data=message)
        if order_instance.status == 'completed':
            OrderCancel.objects.create(reason =  reason , order = order_instance)
            order_instance.status = 'cancelled'
            order_instance.save()
            message ={
                "message":"Successfully Canceld"
            }

            return Response(status=status.HTTP_200_OK , data=message)