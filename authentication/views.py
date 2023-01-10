from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Review, LetterUser, Order
from .serializers import ReviewSerializer, UserCreateSerializer, OrderSerializer
from rest_framework import status


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
    def remove_data(order):
        order.id = ""
        return order
    
    orders = Order.objects.filter(user=request.data.get("id"))

    # orders = list(map(lambda x: remove_data(x), orders))
    
    return Response({"orders": OrderSerializer(orders, many=True).data})


