from product.models import Product, Category
from rest_framework.serializers import ModelSerializer


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name','image','created_at','updated_at']
        read_only_fields = ["id"]




class ProductSerailzers(ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = Product
        fields = ['id','name','description', 'price','image','created_at','updated_at','quantity','category']
        read_only_fields = ["id"]



class ProductSerailzer(ModelSerializer):
    class Meta:
        model = Product
        fields = ['id','name','description', 'price','image','created_at','updated_at','quantity','category']
        read_only_fields = ["id"]