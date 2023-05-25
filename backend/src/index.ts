/* eslint-disable no-console */
import dotenv = require('dotenv');
import express from 'express';
import bodyParser from 'body-parser';

import { userRoutes } from './routes/user.routes';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const HTTP_PORT = process.env.PORT || 5000;

app.use('/api/user', userRoutes);

app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
});

module.exports = app;