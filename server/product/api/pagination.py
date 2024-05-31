from rest_framework.pagination import PageNumberPagination

class CategorySetPagination(PageNumberPagination):
    page_size = 2 
    page_query_param = 'page'
    max_page_size = 1000


class ProductSetPagination(PageNumberPagination):
    page_size = 3
    page_query_param = 'page'
    max_page_size = 1000
