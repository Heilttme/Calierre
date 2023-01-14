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
        
class LetterUser(AbstractUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=15)
    image = models.ImageField(default="pfps/default_pfp.jpg", upload_to=upload_path)
    # orders = models.

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', "image"]


class Review(models.Model):
    content = models.CharField(max_length=255)
    reviewer = models.ForeignKey(LetterUser, on_delete=models.CASCADE)


class Order(models.Model):
    title = models.CharField(max_length=255)
    content = models.CharField(max_length=2550)
    font = models.CharField(max_length=255)

    country = models.CharField(max_length=255)
    region = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    street = models.CharField(max_length=255)

    date = models.DateTimeField(default=datetime.now, blank=True)

    user = models.ForeignKey(LetterUser, on_delete=models.CASCADE)
