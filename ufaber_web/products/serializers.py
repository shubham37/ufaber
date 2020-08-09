from rest_framework import serializers
from .models import *


class ListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    product_name = serializers.CharField(max_length=20, read_only=True)
    subcategory_name = serializers.CharField(max_length=20, read_only=True)
    category_name = serializers.CharField(max_length=20, read_only=True)

    class Meta:
        ordering = ['product_name']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','category_name']

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ['id','subcategory_name']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id','product_name']



