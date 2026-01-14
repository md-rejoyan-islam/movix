import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT!, 10) || 3000,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  apiPrefix: process.env.API_PREFIX || 'api',
  apiVersion: process.env.API_VERSION || 'v1',
}));

export interface AppConfig {
  nodeEnv: string;
  port: number;
  frontendUrl: string;
  apiPrefix: string;
  apiVersion: string;
}
