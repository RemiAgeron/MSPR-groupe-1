from .views import UserViewSet, ConversationViewSet, MessageViewSet, CommentViewSet, BotanistViewSet, ReviewViewSet, PlantViewSet, PostViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('user', UserViewSet, basename='users')
router.register('conversation', ConversationViewSet, basename='conversations')
router.register('message', MessageViewSet, basename='messages')
router.register('comment', CommentViewSet, basename='comments')
router.register('botanist', BotanistViewSet, basename='botanists')
router.register('review', ReviewViewSet, basename='reviews')
router.register('plant', PlantViewSet, basename='plants')
router.register('post', PostViewSet, basename='posts')

urlpatterns = router.urls