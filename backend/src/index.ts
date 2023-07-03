/* eslint-disable no-console */
import dotenv = require('dotenv');
import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import responseTime from 'response-time';
// import multer from 'multer';

import { restResponseTimeHistogram, startMetricsServer } from './utils/metrics';
import { userRoutes } from './routes/user.routes';
import { botanistRoutes } from './routes/botanist.routes';
import { messageRoutes } from './routes/message.routes';
import { reviewRoutes } from './routes/review.routes';
import { postRoutes } from './routes/post.routes';
import { commentRoutes } from './routes/comment.routes';
import { searchRoutes } from './routes/search.routes';

dotenv.config();

const HTTP_PORT = process.env.PORT || 5000;

const app: Application = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(
  responseTime((req: Request, res: Response, time: number) => {
    if (req?.route?.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status: res.statusCode,
        },
        time * 1000,
      );
    }
  }),
);

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/botanist', botanistRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/search', searchRoutes);

app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
});

startMetricsServer();

module.exports = app;
