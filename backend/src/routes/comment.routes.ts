import router = require('express');
import commentController = require('../controllers/comment.controller');
import { checkJwtToken } from '../middlewares/auth.middleware';

export const commentRoutes = router.Router();

commentRoutes.get('/', commentController.getComments);
commentRoutes.get('/:id', checkJwtToken, commentController.getComment);
commentRoutes.get(
  '/user/:id',
  checkJwtToken,
  commentController.getCommentByUser,
);
commentRoutes.get(
  '/post/:id',
  checkJwtToken,
  commentController.getCommentByPost,
);
commentRoutes.post('/', checkJwtToken, commentController.createComment);
commentRoutes.patch('/:id', checkJwtToken, commentController.updateComment);
commentRoutes.delete('/:id', commentController.deleteComment);
