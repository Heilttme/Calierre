from requests import post
from yookassa import Configuration, Payment
from time import sleep

Configuration.account_id = "978735"
Configuration.secret_key = "live_r-oXGg8Z5jvLzPCEFMDiBlypmS1xVOiWVj5tkrhxjI8"

while True:
    orders = post("https://api.calierre.ru/authentication/get_orders_from_users/").json().get("orders")
    for i in range(len(orders)):
        payment = Payment.find_one(orders[i].get("payment_id"))
        if payment.status == "succeeded" and not orders[i].get("notified"):

            title = orders[i].get("title")
            content = orders[i].get("content")
            details = orders[i].get("details")
            mistakes = orders[i].get("mistakes")
            street = orders[i].get("street")
            city = orders[i].get("city")
            flat = orders[i].get("flat")
            details_for_courier = orders[i].get("details_for_courier")
            option = orders[i].get("option")
            seal_basic = orders[i].get("seal_basic")
            seal_advanced = orders[i].get("seal_advanced")
            wax_advanced = orders[i].get("wax_advanced")
            delivery = orders[i].get("delivery")
            phone = orders[i].get("phone")
            user = orders[i].get("user")
            payment_id = orders[i].get("payment_id")
            
            post("https://api.calierre.ru/email/send_email/", {
                "content": content, 
                "details": details, 
                "mistakes": mistakes, 
                "street": street, 
                "city": city, 
                "flat": flat, 
                "details_for_courier": details_for_courier, 
                "option": option, 
                "seal_basic": seal_basic, 
                "seal_advanced": seal_advanced, 
                "wax_advanced": wax_advanced, 
                "delivery": delivery, 
                "phone": phone, 
                "user": user,
                "payment_id": payment_id
            })

            post("https://api.calierre.ru/authentication/set_order_notified/", {"id": orders[i].get("id")})
            post("https://api.calierre.ru/authentication/notify_user_order_was_paid/", {"id": user})
    sleep(30)