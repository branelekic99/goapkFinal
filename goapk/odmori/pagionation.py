from rest_framework.pagination import LimitOffsetPagination,PageNumberPagination

class OdmorPagination(LimitOffsetPagination):
    default_limit=10
    max_limit=10

class OdmorZaposleniPagination(LimitOffsetPagination):
    default_limit = 10
    max_limix = 10