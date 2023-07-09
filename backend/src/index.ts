/* eslint-disable no-console */
import dotenv = require('dotenv');
import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import responseTime from 'response-time';

import { userRoutes } from './routes/user.routes';
import { botanistRoutes } from './routes/botanist.routes';
import { messageRoutes } from './routes/message.routes';
import { reviewRoutes } from './routes/review.routes';
import { postRoutes } from './routes/post.routes';
import { commentRoutes } from './routes/comment.routes';
import { searchRoutes } from './routes/search.routes';
import {
  requestCounter,
  restResponseTimeHistogram,
  registry,
} from './utils/metrics';

dotenv.config();

const HTTP_PORT = process.env.PORT || 5000;

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', registry.contentType);
  return res.send(await registry.metrics());
});

app.use((req: Request, res: Response, next) => {
  requestCounter.inc();
  next();
});

app.use(
  responseTime((req: Request, res: Response, time: number) => {
    if (req?.route?.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.baseUrl + req.route.path,
          status: res.statusCode,
        },
        time * 1000,
      );
    }
  }),
);

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

module.exports = app;
