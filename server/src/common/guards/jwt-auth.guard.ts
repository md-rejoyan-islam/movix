import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '../../auth/services/jwt.service';
import { User, UserDocument } from '../../users/schemas/user.schema';
import { AUTH_MESSAGES } from '../constants';
import { IAuthenticatedUser } from '../interfaces';

interface RequestWithUser {
  headers: { authorization?: string };
  user?: IAuthenticatedUser;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.jwtService.extractTokenFromHeader(
      request.headers.authorization,
    );

    if (!token) {
      throw new UnauthorizedException(AUTH_MESSAGES.ACCESS_TOKEN_REQUIRED);
    }

    try {
      const payload = await this.jwtService.verifyAccessToken(token);
      const user = await this.userModel.findById(payload.id);

      if (!user || !user.isActive) {
        throw new UnauthorizedException(AUTH_MESSAGES.USER_INACTIVE);
      }

      request.user = {
        id: user._id.toString(),
        email: user.email,
        fullName: user.fullName,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException(
        error instanceof UnauthorizedException
          ? error.message
          : AUTH_MESSAGES.INVALID_ACCESS_TOKEN,
      );
    }
  }
}
