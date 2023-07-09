import router = require('express');
import postController = require('../controllers/post.controller');
import { checkJwtToken } from '../middlewares/auth.middleware';

export const postRoutes = router.Router();

postRoutes.get('/', postController.getPosts);
postRoutes.get('/:id', checkJwtToken, postController.getPost);
postRoutes.get('/user/:id', checkJwtToken, postController.getPostsByUser);
postRoutes.post('/', checkJwtToken, postController.createPost);
postRoutes.patch('/:id', checkJwtToken, postController.updatePost);
postRoutes.delete('/:id', postController.deletePost);


export const postRequest = {
  "/post": {
    get: {
      tags: ["Post"],
      responses: { 200: { description: "Operation succeed" } }
    },
    post: {
      tags: ["Post"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  default: "title"
                },
                content: {
                  type: "string",
                  default: "message"
                },
                senderId: {
                  type: "string",
                  default: "0"
                },
                tags: {
                  type: "string",
                  default: ""
                },
                picture: {
                  type: "string",
                  default: ""
                }
              },
              required: ["title", "content", "senderId"]
            }
          }
        }
      },
      responses: { 201: { description: "Created" } }
    }
  },
  "/post/{id}": {
    get: {
      tags: ["Post"],
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
    },
    patch: {
      tags: ["Post"],
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
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  default: "title"
                },
                content: {
                  type: "string",
                  default: "message"
                },
                tags: {
                  type: "string",
                  default: ""
                }
              }
            }
          }
        }
      },
      responses: { 200: { description: "Operation succeed" } }
    },
    delete: {
      tags: ["Post"],
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
  },
  "/post/user/{id}": {
    get: {
      tags: ["Post"],
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