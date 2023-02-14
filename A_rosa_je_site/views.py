from django.http import HttpResponse
from django.shortcuts import render

from rest_framework import viewsets
from .models import User, Conversation, Message, Comment, Botanist, Review, Plant, Post
from .serializers import UserSerializer, ConversationSerializer, MessageSerializer, CommentSerializer, BotanistSerializer, ReviewSerializer, PlantSerializer, PostSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class BotanistViewSet(viewsets.ModelViewSet):
    queryset = Botanist.objects.all()
    serializer_class = BotanistSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class PlantViewSet(viewsets.ModelViewSet):
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer