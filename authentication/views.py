from django.shortcuts import render
from rest_framework.decorators import api_view
from asgiref.sync import sync_to_async
from rest_framework.response import Response
from .models import Review, LetterUser, Order
from .serializers import ReviewSerializer, UserCreateSerializer, OrderSerializer
from rest_framework import status
from yookassa import Configuration, Payment
import uuid
from requests import post
from time import sleep
import asyncio

@api_view(["GET"])
def get_reviews(request):
    
    def remove_password(user):
        user.password = ""
        return user
    
    reviews = Review.objects.all()
    data = list(map(dict, ReviewSerializer(reviews, many=True).data))
    ids = set()
    for i in range(len(data)):
        ids.add(data[i].get("reviewer"))

    ids = list(ids)
    users_with_reviews = []
    for i in range(len(ids)):
        users_with_reviews.append(LetterUser.objects.filter(id=ids[i]))
    
    users_with_reviews = list(map(lambda x: list(x)[0], users_with_reviews))
    users_with_reviews = list(map(lambda x: remove_password(x), users_with_reviews))

    return Response({"items": ReviewSerializer(reviews, many=True).data, "users": UserCreateSerializer(users_with_reviews, many=True).data})

@api_view(["POST"])
def add_review(request):
    user = LetterUser.objects.filter(email=request.data.get("email"))[0]
    
    review = ReviewSerializer(data={"content": request.data.get("content"), "reviewer": user.id})
    review.is_valid()
    review.save()
    
    return Response(status=status.HTTP_200_OK)    
    
@api_view(["POST"])
def get_orders(request):
    
    orders = Order.objects.filter(user=request.data.get("id"))

    # orders = list(map(lambda x: remove_data(x), orders))
    
    return Response({"orders": OrderSerializer(orders, many=True).data})
    
@api_view(["POST"])
def add_orders(request):
    title = request.data.get("title")
    content = request.data.get("content")
    details = request.data.get("details")
    mistakes = request.data.get("mistakes")
    street = request.data.get("street")
    city = request.data.get("city")
    flat = request.data.get("flat")
    detailsForCourier = request.data.get("detailsForCourier")
    option = request.data.get("option")
    sealBasic = request.data.get("sealBasic")
    sealAdvanced = request.data.get("sealAdvanced")
    waxAdvanced = request.data.get("waxAdvanced")
    dateTime = request.data.get("dateTime")
    phone = request.data.get("phone")
    user = request.data.get("user")
    payment_id = request.data.get("payment_id")

    order = OrderSerializer(data={"title": title, 
        "content": content, 
        "details": details, 
        "mistakes": mistakes, 
        "street": street, 
        "city": city, 
        "flat": flat, 
        "details_for_courier": detailsForCourier, 
        "option": option, 
        "seal_basic": sealBasic, 
        "seal_advanced": sealAdvanced, 
        "wax_advanced": waxAdvanced, 
        "delivery": dateTime, 
        "phone": phone, 
        "user": user,
        "payment_id": payment_id
    })
    order.is_valid()
    order.save()

    return Response(status=status.HTTP_200_OK)


@api_view(["POST"])
def get_orders_from_users(request):
    orders = Order.objects.all()
    
    return Response({"orders": OrderSerializer(orders, many=True).data})

@api_view(["POST"])
def change_order_status_taken(request):
    order = list(Order.objects.filter(id=request.data.get("id")))[0]

    order.taken = True
    order.save()

    return Response({"status": status.HTTP_200_OK})

    
@api_view(["POST"])
def change_order_status_checked(request):
    order = Order.objects.filter(id=request.data.get("id"))[0]

    order.checked = 1
    order.save()

    return Response({"status": status.HTTP_200_OK})

@api_view(["POST"])
def change_order_status_completed(request):
    order = Order.objects.filter(id=request.data.get("id"))[0]

    order.completed = 1
    order.save()

    return Response({"status": status.HTTP_200_OK})


@api_view(["POST"])
def change_order_status_delivered(request):
    order = Order.objects.filter(id=request.data.get("id"))[0]

    order.delivered = 1
    order.save()

    return Response({"status": status.HTTP_200_OK})

    
@api_view(["POST"])
def set_order_notified(request):
    order = Order.objects.filter(id=request.data.get("id"))[0]

    order.notified = 1
    order.save()

    return Response({"status": status.HTTP_200_OK})

# @api_view(["POST"])
# async def check_payment_status(request):
# async def check_payment_status(id, orderData):
#     Configuration.account_id = "978735"
#     Configuration.secret_key = "live_r-oXGg8Z5jvLzPCEFMDiBlypmS1xVOiWVj5tkrhxjI8"
    
#     while True:
#         print(23123)
#         await asyncio.sleep(5)
#         payment = Payment.find_one(id)
#         if payment.status == "succeeded":
#             res = post("http://localhost:8000/email/send_email/", {"orderData": orderData})

#             return Response(status=status.HTTP_200_OK)

@api_view(["POST"])
def proceed_payment(request):
    idempotence_key = str(uuid.uuid4())

    Configuration.account_id = "978735"
    Configuration.secret_key = "live_r-oXGg8Z5jvLzPCEFMDiBlypmS1xVOiWVj5tkrhxjI8"

    return_data = ""

    if request.data.get("method") == "sberpay":
        if request.data.get("mobile"):
            payment = Payment.create({
                "amount": {
                    "value": "2.00",
                    "currency": "RUB"
                },
                "payment_method_data": {
                    "type": "sberbank"
                },
                "confirmation": {
                    "type": "mobile_application",
                    "return_url": "https://calierre.ru/success_order"
                },
                "description": "Заказ №72"
            }, idempotence_key)
            return_data = payment.confirmation.confirmation_url
        else:
            payment = Payment.create({
                "amount": {
                    "value": "2.00",
                    "currency": "RUB"
                },
                "payment_method_data": {
                    "type": "sberbank"
                },
                "confirmation": {
                    "type": "qr"
                },
                "description": "Заказ №72"
            }, idempotence_key)
            return_data = payment.confirmation.confirmation_data

    elif request.data.get("method") == "credit":
        payment = Payment.create({
            "amount": {
                "value": "2.00",
                "currency": "RUB"
            },
            "payment_method_data": {
                "type": "bank_card"
            },
            "confirmation": {
                "type": "redirect",
                "return_url": "https://calierre.ru/success_order"
            },
            "description": "Заказ №72"
        }, idempotence_key)
        return_data = payment.confirmation.confirmation_url

    title = request.data.get("orderData").get("title")
    content = request.data.get("orderData").get("content")
    details = request.data.get("orderData").get("details")
    mistakes = request.data.get("orderData").get("mistakes")
    street = request.data.get("orderData").get("street")
    city = request.data.get("orderData").get("city")
    flat = request.data.get("orderData").get("flat")
    detailsForCourier = request.data.get("orderData").get("detailsForCourier")
    option = request.data.get("orderData").get("option")
    sealBasic = request.data.get("orderData").get("sealBasic")
    sealAdvanced = request.data.get("orderData").get("sealAdvanced")
    waxAdvanced = request.data.get("orderData").get("waxAdvanced")
    dateTime = request.data.get("orderData").get("dateTime")
    phone = request.data.get("orderData").get("phone")
    user = request.data.get("orderData").get("user")
    
    # post("http://localhost:8000/authentication/add_orders/", {"title": title, 
    post("https://api.calierre.ru/authentication/add_orders/", {"title": title, 
        "content": content, 
        "details": details, 
        "mistakes": mistakes, 
        "street": street, 
        "city": city, 
        "flat": flat, 
        "detailsForCourier": detailsForCourier, 
        "option": option, 
        "sealBasic": sealBasic, 
        "sealAdvanced": sealAdvanced, 
        "waxAdvanced": waxAdvanced, 
        "dateTime": dateTime, 
        "phone": phone, 
        "user": user, 
        "payment_id": payment.id
    })
    
    return Response({"url": return_data}, status=status.HTTP_200_OK)


@api_view(["POST"])
def aaaa(request):
    return Response(status=status.HTTP_200_OK)