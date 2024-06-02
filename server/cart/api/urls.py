from django.urls import path
from .views import * 

urlpatterns = [
    path('cart/<int:user_id>/', CreateCart.as_view(), name='create-cart'),
    path('cart/update/<int:user_id>/', UpdateCart.as_view(), name='update-cart'),
    path('list/cart/<int:user_id>/', ListCart.as_view(), name='list-cart'),
    path('delete/cart/<int:cart_id>/', DeleteCartItem.as_view(), name='create-cart'),
    path('create-order/<int:user_id>/', CreateOrder.as_view(), name='create-order'),
    path('verify-payment/<int:user_id>/', VerifyPaymentView.as_view(),name='verifying-payment'),
    path('adminside/',RecendOrder.as_view(), name='recend-order'),
    path('orders/',OrderHistory.as_view(), name='order-history'),
    path('userorder/<int:user_id>/',UserOrderHistory.as_view(),name='user-order'),
    path('cancel/<int:order_id>/',CancelOrder.as_view(), name='cancel-order'),
    path('userorderview/<int:order_id>/', UserOrderIndivualHistory.as_view(), name='user-order')
]
