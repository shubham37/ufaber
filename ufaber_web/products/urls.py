from django.contrib import admin
from django.conf.urls import url
from products import views

urlpatterns = [
    # 1. API For All Products
    url(r'^product_list/$', views.index, name="home"),

    #2. API for All Category
    url(r'^categories/$', views.categories, name="categories"),

    #3. API for Sub Category againt a Category
    url(r'^sub_categories/(?P<category>\d+)/$', views.sub_categories, name="sub_categories"),

    #4. API for Products againt a Category
    url(r'^cat_products/(?P<category>\d+)/$', views.cat_products, name="cat_products"),

    #5. API for Products againt a Sub Category
    url(r'^sub_cat_products/(?P<subcategory>\d+)/$', views.sub_products, name="sub_products"),

    #6. API for Create or Delete Product(s)
    url(r'^add_products/$', views.ProductCreateView.as_view(), name="add_products"),
]
