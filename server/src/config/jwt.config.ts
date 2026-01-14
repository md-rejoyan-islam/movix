import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => ({
  accessSecret: process.env.JWT_ACCESS_SECRET || 'default-access-secret',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'default-refresh-secret',
  accessExpiration: process.env.JWT_ACCESS_EXPIRATION || '15m',
  refreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',
  bcryptRounds: 10,
}));

export interface JwtConfig {
  accessSecret: string;
  refreshSecret: string;
  accessExpiration: string;
  refreshExpiration: string;
  bcryptRounds: number;
}
