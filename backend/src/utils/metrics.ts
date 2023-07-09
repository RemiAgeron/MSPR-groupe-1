import prometheus from 'prom-client';

export const registry = new prometheus.Registry();

export const requestCounter = new prometheus.Counter({
  name: 'request_counter',
  help: 'Total number of requests',
  registers: [registry],
});

export const restResponseTimeHistogram = new prometheus.Histogram({
  name: 'rest_response_time_seconds',
  help: 'REST API response time in seconds',
  labelNames: ['method', 'route', 'status'],
  registers: [registry],
});

export const userCounter = new prometheus.Counter({
  name: 'user_counter',
  help: 'Total number of users',
  registers: [registry],
});

export const postCounter = new prometheus.Counter({
  name: 'post_counter',
  help: 'Total number of posts',
  registers: [registry],
});

registry.registerMetric(requestCounter);
registry.registerMetric(restResponseTimeHistogram);
registry.registerMetric(userCounter);

registry.setDefaultLabels({
  app: 'arosaje-api',
});

prometheus.collectDefaultMetrics({register: registry});
