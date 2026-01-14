import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { AUTH_MESSAGES } from '../../common/constants';
import { User } from '../../users/schemas/user.schema';

export interface JwtPayload {
  id: string;
  email: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateTokens(user: User): Promise<Tokens> {
    const payload: JwtPayload = {
      id: user._id.toString(),
      email: user.email,
    };

    const accessSecret = this.configService.get<string>(
      'JWT_ACCESS_SECRET',
      'default-secret',
    );
    const refreshSecret = this.configService.get<string>(
      'JWT_REFRESH_SECRET',
      'default-secret',
    );

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: accessSecret,
      }),
      this.jwtService.signAsync(payload, {
        secret: refreshSecret,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async verifyAccessToken(token: string): Promise<JwtPayload> {
    try {
      const secret = this.configService.get<string>(
        'JWT_ACCESS_SECRET',
        'default-secret',
      );
      return await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret,
      });
    } catch {
      throw new UnauthorizedException(AUTH_MESSAGES.INVALID_ACCESS_TOKEN);
    }
  }

  async verifyRefreshToken(token: string): Promise<JwtPayload> {
    try {
      const secret = this.configService.get<string>(
        'JWT_REFRESH_SECRET',
        'default-secret',
      );
      return await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret,
      });
    } catch {
      throw new UnauthorizedException(AUTH_MESSAGES.INVALID_REFRESH_TOKEN);
    }
  }

  async decodeToken(token: string): Promise<JwtPayload | null> {
    try {
      const secret = this.configService.get<string>(
        'JWT_ACCESS_SECRET',
        'default-secret',
      );
      return await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret,
      });
    } catch {
      return null;
    }
  }

  extractTokenFromHeader(authHeader: string | undefined): string | undefined {
    if (!authHeader) {
      return undefined;
    }
    const [type, token] = authHeader.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
