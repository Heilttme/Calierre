from django.urls import path
from .views import send_order_notification

urlpatterns = [
    path("send_email/", send_order_notification),
]