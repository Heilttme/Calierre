from django.urls import path
from .views import get_reviews, get_orders, add_review

urlpatterns = [
    path("reviews/", get_reviews),
    path("orders/", get_orders),
    path("add_review/", add_review),
]
