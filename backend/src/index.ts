/* eslint-disable no-console */
import dotenv = require('dotenv');
import express from 'express';
import bodyParser from 'body-parser';

// import actorRoutes from './routes/actor.routes';
// import genreRoutes from './routes/genre.routes';
// import filmRoutes from './routes/film.routes';

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const HTTP_PORT = process.env.PORT || 5000;

// app.use('/api/actor', actorRoutes);
// app.use('/api/genre', genreRoutes);
// app.use('/api/film', filmRoutes);

app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
});
