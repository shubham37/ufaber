from django.db import models

# Create your models here.
class Category(models.Model):
    category_name = models.CharField(max_length=20, blank=True,null=True)

    def __str__(self):
        return self.category_name

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = 'Categories'


class SubCategory(models.Model):
    subcategory_name = models.CharField(max_length=20, blank=True,null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.subcategory_name

    class Meta:
        verbose_name = "SubCategory"
        verbose_name_plural = 'SubCategories'


class Product(models.Model):
    product_name = models.CharField(max_length=20, blank=True,null=True)
    sub_category = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.product_name

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = 'Products'
