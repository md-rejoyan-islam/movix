import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  uri: process.env.MONGODB_URI,
  options: {
    retryWrites: true,
    w: 'majority',
  },
}));

export interface DatabaseConfig {
  uri: string;
  options: {
    retryWrites: boolean;
    w: string;
  };
}
