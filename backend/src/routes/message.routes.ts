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


export const messageRequest = {
  "/message": {
    get: {
      tags: ["Message"],
      responses: { 200: { description: "Operation succeed" } }
    },
    post: {
      tags: ["Message"],
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
                  type: "string",
                  default: "0"
                },
                receiverId: {
                  type: "string",
                  default: "0"
                }
              },
              required: ["content", "senderId", "receiverId"]
            }
          }
        }
      },
      responses: { 201: { description: "Created" } }
    }
  },
  "/message/{id}": {
    get: {
      tags: ["Message"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Message's ID",
          required: true,
          schema: {
            type: "integer"
          }
        }
      ],
      responses: { 200: { description: "Operation succeed" } }
    },
    patch: {
      tags: ["Message"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Message's ID",
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
      tags: ["Message"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Message's ID",
          required: true,
          schema: {
            type: "integer"
          }
        }
      ],
      responses: { 200: { description: "Operation succeed" } }
    }
  },
  "/message/user/{id}": {
    get: {
      tags: ["Message"],
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
  }
};