import express, { Application } from 'express';
import client from 'prom-client';
import cors from 'cors';

const app: Application = express();

app.use(cors());

export const restResponseTimeHistogram = new client.Histogram({
  name: 'rest_response_time_seconds',
  help: 'REST API response time in seconds',
  labelNames: ['method', 'route', 'status'],
});

export const databaseResponseTimeHistogram = new client.Histogram({
  name: 'database_response_time_seconds',
  help: 'Database response time in seconds',
  labelNames: ['operation', 'success'],
});


export const startMetricsServer = () => {
  const collectDefaultMetrics = client.collectDefaultMetrics;

  collectDefaultMetrics({ prefix: 'arosaje_' });

  app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);

    return res.send(await client.register.metrics());
  });

  app.listen(9100, () => {
    console.log(`Metrics server running on port 9100`);
  });
};
