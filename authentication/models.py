from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin, BaseUserManager
from datetime import datetime

class UserAccountManager(BaseUserManager):
    def create_user(self, email, username, password):
        if not email:
            raise ValueError("Users must have an email adress")

        email = self.normalize_email(email)
        user = self.model(email=email, username=username)

        user.set_password(password)
        user.save()

        return user
        
def upload_path(instance, filename):
    return "/".join(["pfps", filename])


def upload_path_reviews(instance, filename):
    return "/".join(["reviews", filename])
        
class LetterUser(AbstractUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=15)
    image = models.ImageField(default="pfps/default_pfp.jpg", upload_to=upload_path)
    is_printer = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["is_staff", "is_printer", 'username', "image"]


class Review(models.Model):
    content = models.CharField(max_length=255)
    reviewer = models.ForeignKey(LetterUser, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=upload_path_reviews, blank=True, null=True)


class Order(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    content = models.CharField(max_length=2550, blank=True, null=True)
    details = models.CharField(max_length=255, blank=True, null=True)
    mistakes = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    street = models.CharField(max_length=255, blank=True, null=True)
    flat = models.CharField(max_length=255, blank=True, null=True)
    details_for_courier = models.CharField(max_length=255, blank=True, null=True)
    option = models.CharField(max_length=255, blank=True, null=True)
    seal_basic = models.CharField(max_length=255, blank=True, null=True)
    seal_advanced = models.CharField(max_length=255, blank=True, null=True)
    wax_advanced = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=255, blank=True, null=True)
    delivery = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(max_length=255, blank=True, null=True, default="")

    payment_id = models.CharField(max_length=255, default="", blank=True, null=True)

    date = models.DateTimeField(default=datetime.now(), blank=True, null=True)
    
    paid = models.BooleanField(default=False)
    notified = models.BooleanField(default=False)
    taken = models.BooleanField(default=False)      # first step: writer takes order
    completed = models.BooleanField(default=False)  # second step: writer completes order
    checked = models.BooleanField(default=False)    # third step: expert checks letter
    delivered = models.BooleanField(default=False)  # fourth step: delivery co delivers order

    user = models.ForeignKey(LetterUser, blank=True, null=True, on_delete=models.CASCADE)
