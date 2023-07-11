import router = require('express');
import commentController = require('../controllers/comment.controller');
import { checkJwtToken } from '../middlewares/auth.middleware';

export const commentRoutes = router.Router();

commentRoutes.get('/', commentController.getComments);
commentRoutes.get('/:id', checkJwtToken, commentController.getComment);
commentRoutes.get('/user/:id', checkJwtToken, commentController.getCommentByUser);
commentRoutes.get('/post/:id', commentController.getCommentByPost);
commentRoutes.post('/', checkJwtToken, commentController.createComment);
commentRoutes.patch('/:id', checkJwtToken, commentController.updateComment);
commentRoutes.delete('/:id', checkJwtToken, commentController.deleteComment);


export const commentRequest = {
  "/comment": {
    get: {
      tags: ["Comment"],
      responses: { 200: { description: "Operation succeed" } }
    },
    post: {
      tags: ["Comment"],
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
                senderId: {
                  type: "integer",
                  default: 0
                },
                postId: {
                  type: "integer",
                  default: 0
                }
              },
              required: ["content", "senderId", "postId"]
            }
          }
        }
      },
      responses: { 201: { description: "Created" } }
    }
  },
  "/comment/{id}": {
    get: {
      tags: ["Comment"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Comment's ID",
          required: true,
          schema: {
            type: "integer"
          }
        }
      ],
      responses: { 200: { description: "Operation succeed" } }
    },
    patch: {
      tags: ["Comment"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Comment's ID",
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
                }
              },
              required: ["content"]
            }
          }
        }
      },
      responses: { 200: { description: "Operation succeed" } }
    },
    delete: {
      tags: ["Comment"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Comment's ID",
          required: true,
          schema: {
            type: "integer"
          }
        }
      ],
      responses: { 200: { description: "Operation succeed" } }
    }
  },
  "/comment/user/{id}": {
    get: {
      tags: ["Comment"],
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
  "/comment/post/{id}": {
    get: {
      tags: ["Comment"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Post's ID",
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
