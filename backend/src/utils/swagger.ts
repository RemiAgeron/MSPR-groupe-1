import { Application, Request, Response } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    info: {
      title: 'Arosaje API',
      version: '1.0.0',
      description: 'Arosaje API documentation',
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
    basePath: '/api/',
    paths: {
      "/user": {
        get: {
          tags: ["User"],
          responses: {
            200: { description: "Operation succeed" },
            500: { description: "Server Error" },
          }
        }
      },
      "/user/{id}": {
        get: {
          tags: ["User"],
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
          responses: {
            200: { description: "Operation succeed" },
            404: { description: "Not Found" },
            400: { description: "Bad request" },
            500: { description: "Server Error" },
          }
        }
      },
      "/botanist": {
        get: {
          tags: ["Botanist"],
          responses: {
            200: { description: "Operation succeed" },
            500: { description: "Server Error" },
          }
        }
      },
    }
  },
  apis: []
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app: Application) => app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default swaggerDocs