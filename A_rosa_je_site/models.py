from django.db import models
from django.utils.timezone import now as django_now

class User(models.Model):
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    phone = models.CharField(max_length=100, unique=True)
    user_picture = models.ImageField(blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateField(default=django_now, blank=True)

class Conversation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='conversations')

class Message(models.Model):
    content = models.TextField()
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    created_at = models.DateField(default=django_now, blank=True)

class Comment(models.Model):
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    created_at = models.DateField(default=django_now, blank=True)

class Botanist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='botanist')
    address = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100, blank=True)

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    botanist = models.ForeignKey(Botanist, on_delete=models.CASCADE, related_name='reviews')
    created_at = models.DateField(default=django_now, blank=True)

class Plant(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    picture = models.ImageField(blank=True)
    type = models.CharField(max_length=100, blank=True)

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    description = models.TextField(max_length=255)
    picture = models.ImageField(blank=True)
    plant = models.ManyToManyField(Plant, related_name='posts', blank=True)
    comments = models.ManyToManyField(Comment, related_name='posts', blank=True)
    created_at = models.DateField(default=django_now, blank=True)