/* eslint-disable no-console */
import dotenv = require('dotenv');
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

// User routes
import { userRoutes } from './routes/user.routes';
import { botanistRoutes } from './routes/botanist.routes';

// Messages routes
import { messageRoutes } from './routes/message.routes';

// Review routes
import { reviewRoutes } from './routes/review.routes';

// // Publications routes
import { postRoutes } from './routes/post.routes';
import { commentRoutes } from './routes/comment.routes';

dotenv.config();

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

const HTTP_PORT = process.env.PORT || 5000;

// API Routes
// User routes
app.use('/api/user', userRoutes);
app.use('/api/botanist', botanistRoutes);

// Messages routes
app.use('/api/message', messageRoutes);

// // Review routes
app.use('/api/review', reviewRoutes);

// // Publications routes
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
});

module.exports = app;
