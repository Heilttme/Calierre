from django.urls import path
from .views import send_order_notification, send_contact_info, order_completed_notification, notify_user_order_was_created, notify_user_order_was_paid

urlpatterns = [
    path("send_email/", send_order_notification),
    path("send_contact_info/", send_contact_info),
    path("order_completed_notification/", order_completed_notification),
    path("notify_user_order_was_created/", notify_user_order_was_created),
    path("notify_user_order_was_paid/", notify_user_order_was_paid),
]