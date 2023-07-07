import router = require('express');
import botanistController = require('../controllers/botanist.controller');
import { checkJwtToken } from '../middlewares/auth.middleware';

export const botanistRoutes = router.Router();

botanistRoutes.get('/', botanistController.getBotanists);
botanistRoutes.get('/:id', checkJwtToken, botanistController.getBotanist);
botanistRoutes.get('/user/:id', checkJwtToken, botanistController.getBotanistByUser);
botanistRoutes.post('/', checkJwtToken, botanistController.createBotanist);
botanistRoutes.patch('/:id', checkJwtToken, botanistController.updateBotanist);
botanistRoutes.delete('/:id', checkJwtToken, botanistController.deleteBotanist);


export const botanistRequest = {
  "/botanist": {
    get: {
      tags: ["Botanist"],
      responses: { 200: { description: "Operation succeed" } }
    },
    post: {
      tags: ["Botanist"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                userId: {
                  type: "string",
                  default: "0"
                },
                adress: {
                  type: "string",
                  default: "adress"
                },
                company_name: {
                  type: "string",
                  default: "company_name"
                }
              },
              required: ["userId", "adress", "company_name"]
            }
          }
        }
      },
      responses: { 201: { description: "Created" } }
    }
  },
  "/botanist/{id}": {
    get: {
      tags: ["Botanist"],
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
    },
    patch: {
      tags: ["Botanist"],
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
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                adress: {
                  type: "string",
                  default: "adress"
                },
                company_name: {
                  type: "string",
                  default: "company_name"
                }
              },
              required: ["adress", "company_name"]
            }
          }
        }
      },
      responses: { 200: { description: "Operation succeed" } }
    },
    delete: {
      tags: ["Botanist"],
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
  },
  "/botanist/user/{id}": {
    get: {
      tags: ["Botanist"],
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
};
