import json
import ipdb
from django.db.models import F
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import response

from products.models import *
from products.serializers import *


@csrf_exempt
@api_view(['GET'])
def index(request):
    products = Product.objects.annotate(
        subcategory_name = F('sub_category__subcategory_name'),
        category_name = F('category__category_name')
    ).values(
        'id','product_name','subcategory_name','category_name'
    )   
    serializer = ListSerializer(products, many=True)
    return JsonResponse(serializer.data, safe=False)

@csrf_exempt
@api_view(['GET'])
def categories(request):
    category = Category.objects.all()
    serializer = CategorySerializer(category, many=True)
    return JsonResponse(serializer.data, safe=False)


@csrf_exempt
@api_view(['GET'])
def sub_categories(request, category):
    sub_category = SubCategory.objects.filter(category_id=category)
    serializer = SubCategorySerializer(sub_category, many=True)
    return JsonResponse(serializer.data, safe=False)


@csrf_exempt
@api_view(['GET'])
def cat_products(request, category):
    products = Product.objects.filter(
        category_id=category
    )
    serializer = ProductSerializer(products, many=True)
    return JsonResponse(serializer.data, safe=False)


@csrf_exempt
@api_view(['GET'])
def sub_products(request, subcategory):
    products = Product.objects.filter(
        sub_category_id=subcategory
    )
    serializer = ProductSerializer(products, many=True)
    return JsonResponse(serializer.data, safe=False)



class ProductCreateView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        data = request.data

        if len(data)>1:
            # Create View
            product = data['product_name']
            sub_category = data['sub_category']
            category = data['category']
            try:
                Product.objects.create(
                    product_name=product,
                    sub_category_id=sub_category,
                    category_id=category
                )
                return response.Response("Record Created", status=200)
            except Exception as e:
                return response.Response("Problem In Creation", status=500)

        elif len(data) == 1:
            # Delete View
            product_ids = data['product_ids']
            try:
                Product.objects.filter(
                    id__in=product_ids
                ).delete()
                return response.Response("Record Deleted", status=200)
            except Exception as e:
                return response.Response("Issue In Deletion", status=500)
        else:
            return response.Response("Data Is Not Coming In Backend", status=400)

