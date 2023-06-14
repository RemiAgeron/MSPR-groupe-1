import router = require('express');
import messageController = require('../controllers/message.controller');
import { checkJwtToken } from '../middlewares/auth.middleware';

export const messageRoutes = router.Router();

messageRoutes.get('/', checkJwtToken, messageController.getMessages);
messageRoutes.get('/:id', checkJwtToken, messageController.getMessage);
messageRoutes.get('/user/:id', checkJwtToken, messageController.getMessageByUser);
messageRoutes.post('/', checkJwtToken, messageController.createMessage);
messageRoutes.patch('/:id', checkJwtToken, messageController.updateMessage);
messageRoutes.delete('/:id', checkJwtToken, messageController.deleteMessage);
