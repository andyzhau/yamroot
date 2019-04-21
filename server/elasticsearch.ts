import { Client } from 'elasticsearch';
import * as AWS from 'aws-sdk';

AWS.config.update({
  credentials: new AWS.Credentials(
    'AKIAJID3XFZSWGNC3OPQ',
    's8P0/oi0WTjuu++Gf/kFfss+sU9kf2YLxKiox5Fu',
  ),
  region: 'us-west-1',
});

export const client = new Client({
  hosts: [
    'https://search-ark7-logs-lzx5cp37jgx5kimun3kjdo4npe.us-west-1.es.amazonaws.com',
  ],
  connectionClass: require('http-aws-es'),
});

client.ping({}, function(error: any) {
  if (error) {
    console.error('elastic client error', error);
  }
});
