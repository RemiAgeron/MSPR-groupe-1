from django.db import models

class User(models.Model):
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    user_picture = models.ImageField()
    phone = models.CharField(max_length=100)
    description = models.TextField()
    role = models.CharField(max_length=100)

class Conversation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='conversations')

class Message(models.Model):
    content = models.TextField()
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')

class Comment(models.Model):
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')

class Botanist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='botanist')
    address = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100)

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    address = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100)
    botanist = models.ForeignKey(Botanist, on_delete=models.CASCADE, related_name='reviews')

class Plant(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    picture = models.ImageField()
    type = models.CharField(max_length=100)

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    description = models.TextField()
    picture = models.ImageField()
    date = models.DateField()
    plant = models.ManyToManyField(Plant, related_name='posts')
    comments = models.ManyToManyField(Comment, related_name='posts')