from django.urls import path
from .views import * 

urlpatterns = [
    path('category/', CreateListCategory.as_view(), name='list-create-category'),
    path('categorys/', CreateListCategorys.as_view(), name='list-create-category'),
    path('category/<int:pk>/', UpdateDestoryRetriveCategory.as_view(), name='update-delete-get-category'),

    path('product/', CreateListProduct.as_view(), name='list-create-product'),
    path('products/', CreateListProducts.as_view(), name='list-create-product'),
    path('products/<int:pk>/',UpdateDestoryRetriveProduct.as_view(), name='update-delete-get-category')
]
