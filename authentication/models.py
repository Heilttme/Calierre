from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin, BaseUserManager

class UserAccountManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError("Users must have an email adress")

        email = self.normalize_email(email)
        user = self.model(email=email, username=username)

        user.set_password(password)
        user.save()

        return user
        
class LetterUser(AbstractUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=15)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
