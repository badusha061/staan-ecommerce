from django.urls import path
from .views import * 

urlpatterns = [
    path('cart/<int:user_id>/', CreateCart.as_view(), name='create-cart'),
    path('cart/update/<int:user_id>/', UpdateCart.as_view(), name='create-cart'),
    path('list/cart/<int:user_id>/', ListCart.as_view(), name='create-cart'),
]
