import * as winston from 'winston';

import { client } from './elasticsearch';

const Elasticsearch = require('winston-elasticsearch');

export const logger = winston.createLogger({
  transports: [
    new Elasticsearch({
      level: 'info',
      client,
      indexPrefix: 'yamroot'
    }),
  ],
});

export const accessLogger = winston.createLogger({
  transports: [
    new Elasticsearch({
      level: 'info',
      client,
      indexPrefix: 'accesslog',
    }),
  ],
});
