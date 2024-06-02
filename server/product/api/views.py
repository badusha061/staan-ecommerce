from rest_framework.generics import ListCreateAPIView ,RetrieveUpdateDestroyAPIView 
from .pagination import CategorySetPagination  , ProductSetPagination
from product.models import Category , Product  
from  .serializers import CategorySerializer , ProductSerailzer , ProductSerailzers
from rest_framework.decorators import permission_classes
from rest_framework.permissions import  IsAdminUser
from rest_framework import filters




# @permission_classes([IsAdminUser])
class CreateListCategory(ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class  =  CategorySerializer
    pagination_class = CategorySetPagination


# @permission_classes([IsAdminUser])
class CreateListCategorys(ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class  =  CategorySerializer





# @permission_classes([IsAdminUser])
class UpdateDestoryRetriveCategory(RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()




# @permission_classes([IsAdminUser])
class CreateListProducts(ListCreateAPIView):
    serializer_class  =  ProductSerailzers
    pagination_class = ProductSetPagination
    queryset = Product.objects.all().order_by('id')
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']     


# @permission_classes([IsAdminUser])
class CreateListProduct(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class  =  ProductSerailzer
    pagination_class = ProductSetPagination


# @permission_classes([IsAdminUser])
class UpdateDestoryRetriveProduct(RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerailzers
    queryset = Product.objects.all()