from django.contrib.auth.tokens import default_token_generator
from templated_mail.mail import BaseEmailMessage

from djoser import utils
from djoser.conf import settings
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response


class ActivationEmail(BaseEmailMessage):
    template_name = "emails/activation.html"

    def get_context_data(self):
        # ActivationEmail can be deleted
        context = super().get_context_data()

        user = context.get("user")
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.ACTIVATION_URL.format(**context)
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
        context["url"] = settings.PASSWORD_RESET_CONFIRM_URL.format(**context)
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