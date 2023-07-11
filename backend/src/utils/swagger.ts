import { Application } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { botanistRequest } from '../routes/botanist.routes';
import { commentRequest } from '../routes/comment.routes';
import { searchRequest } from '../routes/search.routes';
import { messageRequest } from '../routes/message.routes';
import { postRequest } from '../routes/post.routes';
import { userRequest } from '../routes/user.routes';
import { reviewRequest } from '../routes/review.routes';

const options = {
  definition: {
    openapi: "3.0.0",
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
    servers: [
      { url: "http://localhost:5000/api" }
    ],
    paths: {
      ...botanistRequest,
      ...commentRequest,
      ...searchRequest,
      ...messageRequest,
      ...postRequest,
      ...userRequest,
      ...reviewRequest,
    }
  },
  apis: []
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app: Application) => app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default swaggerDocs