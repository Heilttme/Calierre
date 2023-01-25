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

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["is_staff", 'username', "image"]


class Review(models.Model):
    content = models.CharField(max_length=255)
    reviewer = models.ForeignKey(LetterUser, on_delete=models.CASCADE)


class Order(models.Model):
    title = models.CharField(max_length=255, default="")
    content = models.CharField(max_length=2550)
    
    taken = models.BooleanField(default=False)      # first step: writer takes order
    completed = models.BooleanField(default=False)  # second step: writer completes order
    checked = models.BooleanField(default=False)    # third step: expert checks letter
    delivered = models.BooleanField(default=False)  # fourth step: delivery co delivers order
    
    street = models.CharField(max_length=255)
    date = models.DateTimeField(default=datetime.now(), blank=True, null=True)

    user = models.ForeignKey(LetterUser, on_delete=models.CASCADE)
