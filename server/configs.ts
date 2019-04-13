import * as c from 'config';

export interface Configs {
  app: AppConfig;
  mongodb: MongodbConfig;
  frontend: FrontendConfig;
  pug: PugConfig;
}

export interface AppConfig {
  port: number;
  keys: string[];
  cors: string[];
}

export interface MongodbConfig {
  address: string;
}

export interface FrontendConfig {
  host: string;
}

export interface PugConfig {
  viewPath: string;
}

export const configs: Configs = {
  app: c.get('app'),
  mongodb: c.get('mongodb'),
  frontend: c.get('frontend'),
  pug: c.get('pug'),
};
