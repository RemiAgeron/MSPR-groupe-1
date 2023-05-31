import router = require('express');
import conversationController = require('../controllers/conversation.controller');
import { checkJwtToken } from '../middlewares/auth.middleware';

export const conversationRoutes = router.Router();

conversationRoutes.get('/', conversationController.getConversations);
conversationRoutes.get(
  '/:id',
  checkJwtToken,
  conversationController.getConversation,
);
conversationRoutes.get(
  '/user/:id',
  checkJwtToken,
  conversationController.getConversationByUser,
);
conversationRoutes.post(
  '/',
  checkJwtToken,
  conversationController.createConversation,
);
conversationRoutes.patch(
  '/:id',
  checkJwtToken,
  conversationController.updateConversation,
);
conversationRoutes.delete('/:id', conversationController.deleteConversation);
