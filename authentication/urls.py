from django.urls import path
from .views import get_reviews, get_orders, add_review, get_orders_from_users, change_order_status_taken, change_order_status_checked, change_order_status_completed, change_order_status_delivered

urlpatterns = [
    path("reviews/", get_reviews),
    path("orders/", get_orders),
    path("add_review/", add_review),
    path("get_orders_from_users/", get_orders_from_users),
    path("change_order_status_taken/", change_order_status_taken),
    path("change_order_status_checked/", change_order_status_checked),
    path("change_order_status_completed/", change_order_status_completed),
    path("change_order_status_delivered/", change_order_status_delivered),
]
