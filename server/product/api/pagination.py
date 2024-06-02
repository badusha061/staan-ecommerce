from rest_framework.pagination import PageNumberPagination

class CategorySetPagination(PageNumberPagination):
    page_size = 6
    page_query_param = 'page'
    max_page_size = 1000


class ProductSetPagination(PageNumberPagination):
    page_size = 6
    page_query_param = 'page'
    max_page_size = 1000
