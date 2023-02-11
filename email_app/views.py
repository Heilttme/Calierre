from django.contrib.auth.tokens import default_token_generator
from templated_mail.mail import BaseEmailMessage

from djoser import utils
from djoser.conf import settings
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives


class ActivationEmail(BaseEmailMessage):
    template_name = "emails/activation.html"

    def get_context_data(self):
        # ActivationEmail can be deleted
        context = super().get_context_data()

        user = context.get("user")
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.DJOSER.get("ACTIVATION_URL").format(**context)
        return context


class ConfirmationEmail(BaseEmailMessage):
    template_name = "emails/confirmation.html"


class PasswordResetEmail(BaseEmailMessage):
    template_name = "emails/password_reset.html"

    def get_context_data(self):
        # PasswordResetEmail can be deleted
        context = super().get_context_data()

        user = context.get("user")
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.DJOSER.get("PASSWORD_RESET_CONFIRM_URL").format(**context)
        return context


class PasswordChangedConfirmationEmail(BaseEmailMessage):
    template_name = "emails/password_changed_confirmation.html"


@api_view(["POST"])
def send_order_notification(request):
    send_mail(
        "New order",
            f"title: {request.data.get('title')} \n\
            content: {request.data.get('content')} \n\
            details: {request.data.get('details')} \n\
            mistakes: {request.data.get('mistakes')} \n\
            city: {request.data.get('city')} \n\
            street: {request.data.get('street')} \n\
            flat: {request.data.get('flat')} \n\
            detailsForCourier: {request.data.get('detailsForCourier')} \n\
            option: {request.data.get('option')} \n\
            sealBasic: {request.data.get('sealBasic')} \n\
            sealAdvanced: {request.data.get('sealAdvanced')} \n\
            waxAdvanced: {request.data.get('waxAdvanced')} \n\
            dateTime: {request.data.get('dateTime')} \n\
            phone: {request.data.get('phone')}",
        "settings.EMAIL_HOST_USER",
        ["calierre01@mail.ru"],
        fail_silently=False
    )
    
    return Response(status=status.HTTP_200_OK)


@api_view(["POST"])
def send_contact_info(request):
    send_mail(
        "New Contact",
            f"First name: {request.data.get('firstName')} \n\
            Last name: {request.data.get('lastName')} \n\
            E-mail: {request.data.get('email')} \n\
            Message: {request.data.get('message')}",
        "settings.EMAIL_HOST_USER",
        ["calierre01@mail.ru"],
        fail_silently=False
    )
    
    return Response(status=status.HTTP_200_OK)

    
@api_view(["POST"])
def order_completed_notification(request):

    send_mail(
        f"ORDER {request.data.get('date')} COMPLETED BY WRITER AND WAITING TO BE DELIVERED",
            f"Title: {request.data.get('title')} \n\
            Content: {request.data.get('content')} \n\
            City: {request.data.get('city')} \n\
            Street: {request.data.get('street')} \n\
            Flat: {request.data.get('flat')} \n\
            Option: {request.data.get('option')} \n\
            Seal for advanced: {request.data.get('seal_advanced')} \n\
            Seal for basic: {request.data.get('seal_basic')} \n\
            Wax advanced: {request.data.get('wax_advanced')} \n\
            To deliver: {request.data.get('to_deliver')} \n\
            Date added: {request.data.get('date')} \n\
            Details: {request.data.get('details')} \n\
            Details for courier: {request.data.get('details_for_courier')} \n\
            Phone: {request.data.get('phone')} \n\
            Mistakes: {request.data.get('mistakes')}",
        "settings.EMAIL_HOST_USER",
        ["calierre01@mail.ru"],
        fail_silently=False
    )
    
    return Response(status=status.HTTP_200_OK)

@api_view(["POST"])
def notify_user_order_was_created(request):
    html_body = render_to_string("emails/order_created.html")

    message = EmailMultiAlternatives(
        subject="Заказ",
        body="Заказ создан",
        from_email="settings.EMAIL_HOST_USER",
        to=[request.data.get("email")]
    )

    message.attach_alternative(html_body, "text/html")
    message.send(fail_silently=False)

    return Response(status=status.HTTP_200_OK)

@api_view(["POST"])
def notify_user_order_was_paid(request):
    html_body = render_to_string("emails/order_paid.html")

    message = EmailMultiAlternatives(
        subject="Заказ",
        body="Заказ оплачен",
        from_email="settings.EMAIL_HOST_USER",
        to=[request.data.get("email")]
    )

    message.attach_alternative(html_body, "text/html")
    message.send(fail_silently=False)

    return Response(status=status.HTTP_200_OK)