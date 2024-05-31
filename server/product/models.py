from django.db import models

# Create your models here.


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to='Images')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name
    

class Images(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='Product')
    created_at = models.DateTimeField(auto_now_add=True)



class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50,unique=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='Product',null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    quantity = models.IntegerField()
    category = models.ForeignKey(Category,on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.name