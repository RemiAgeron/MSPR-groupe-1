/* eslint-disable no-console */
import dotenv = require('dotenv');
import express from 'express';
import bodyParser from 'body-parser';

// User routes
import { userRoutes } from './routes/user.routes';
import { botanistRoutes } from './routes/botanist.routes';

// Messages routes
import { messagingRoutes } from './routes/messaging.routes';
import { conversationRoutes } from './routes/conversation.routes';

// Publications routes
import { postRoutes } from './routes/post.routes';
import { commentRoutes } from './routes/comment.routes';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const HTTP_PORT = process.env.PORT || 5000;

// API Routes
// User routes
app.use('/api/user', userRoutes);
app.use('/api/botanist', botanistRoutes);

// Messages routes
app.use('/api/messaging', messagingRoutes);
app.use('/api/conversation', conversationRoutes);

// Publications routes
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
});

module.exports = app;
