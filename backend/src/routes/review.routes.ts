import router = require('express');
import reviewController = require('../controllers/review.controller');
import { checkJwtToken } from '../middlewares/auth.middleware';

export const reviewRoutes = router.Router();

reviewRoutes.get('/', reviewController.getReviews);
reviewRoutes.get('/:id', checkJwtToken, reviewController.getReview);
reviewRoutes.get('/user/:id', checkJwtToken, reviewController.getReviewByUser);
reviewRoutes.get('/botanist/:id', checkJwtToken, reviewController.getReviewByBotanist);
reviewRoutes.post('/', checkJwtToken, reviewController.createReview);
reviewRoutes.patch('/:id', checkJwtToken, reviewController.updateReview);
reviewRoutes.delete('/:id', checkJwtToken, reviewController.deleteReview);


export const reviewRequest = {
  "/review": {
    get: {
      tags: ["Review"],
      responses: { 200: { description: "Operation succeed" } }
    },
    post: {
      tags: ["Review"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                content: {
                  type: "string",
                  format: "message"
                },
                senderId: {
                  type: "string",
                  default: "0"
                },
                botanistId: {
                  type: "string",
                  default: "0"
                }
              },
              required: ["content", "senderId", "botanistId"]
            }
          }
        }
      },
      responses: { 201: { description: "Created" } }
    }
  },
  "/review/{id}": {
    get: {
      tags: ["Review"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Review's ID",
          required: true,
          schema: {
            type: "integer"
          }
        }
      ],
      responses: { 200: { description: "Operation succeed" } }
    },
    patch: {
      tags: ["Review"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Review's ID",
          required: true,
          schema: {
            type: "integer"
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                content: {
                  type: "string",
                  default: "message"
                },
              },
              required: ["content"]
            }
          }
        }
      },
      responses: { 200: { description: "Operation succeed" } }
    },
    delete: {
      tags: ["Review"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Review's ID",
          required: true,
          schema: {
            type: "integer"
          }
        }
      ],
      responses: { 200: { description: "Operation succeed" } }
    }
  },
  "/review/user/{id}": {
    get: {
      tags: ["Review"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "User's ID",
          required: true,
          schema: {
            type: "integer"
          }
        }
      ],
      responses: { 200: { description: "Operation succeed" } }
    }
  },
  "/review/botanist/{id}": {
    get: {
      tags: ["Review"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Botanist's ID",
          required: true,
          schema: {
            type: "integer"
          }
        }
      ],
      responses: { 200: { description: "Operation succeed" } }
    }
  }
};
