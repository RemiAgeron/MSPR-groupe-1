from django.contrib import admin
from .models import Post, Comment, User, Conversation, Message, Botanist, Review, Plant

admin.site.register(User)
admin.site.register(Conversation)
admin.site.register(Message)
admin.site.register(Comment)
admin.site.register(Botanist)
admin.site.register(Review)
admin.site.register(Plant)
admin.site.register(Post)