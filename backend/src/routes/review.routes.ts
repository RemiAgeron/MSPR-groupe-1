import router = require('express');
import reviewController = require('../controllers/review.controller');
import { checkJwtToken } from '../middlewares/auth.middleware';

export const reviewRoutes = router.Router();

reviewRoutes.get('/', reviewController.getReviews);
reviewRoutes.get('/:id', checkJwtToken, reviewController.getReview);
reviewRoutes.get(
  '/user/:id',
  checkJwtToken,
  reviewController.getReviewByUser,
);
reviewRoutes.get('/botanist/:id', checkJwtToken, reviewController.getReviewByBotanist);
reviewRoutes.post('/', checkJwtToken, reviewController.createReview);
reviewRoutes.patch('/:id', checkJwtToken, reviewController.updateReview);
reviewRoutes.delete('/:id', checkJwtToken, reviewController.deleteReview);
