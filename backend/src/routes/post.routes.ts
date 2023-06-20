import router = require('express');
import postController = require('../controllers/post.controller');
import { checkJwtToken } from '../middlewares/auth.middleware';

export const postRoutes = router.Router();

postRoutes.get('/', postController.getPosts);
postRoutes.get('/:id', checkJwtToken, postController.getPost);
// postRoutes.get('/user/:id', checkJwtToken, postController.getPostsByUser);
postRoutes.get('/user/:id', postController.getPostsByUser);
postRoutes.post('/', checkJwtToken, postController.createPost);
postRoutes.patch('/:id', checkJwtToken, postController.updatePost);
postRoutes.delete('/:id', postController.deletePost);
