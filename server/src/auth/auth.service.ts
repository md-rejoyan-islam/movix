import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { Model } from 'mongoose';
import { AUTH_MESSAGES } from '../common/constants';
import { User, UserDocument } from '../users/schemas/user.schema';
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  UpdateProfileDto,
} from './dto';
import { JwtService } from './services/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, fullName } = registerDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException(AUTH_MESSAGES.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email,
      password: hashedPassword,
      fullName,
    });

    const tokens = await this.jwtService.generateTokens(user);

    await this.userModel.findByIdAndUpdate(user._id, { lastLogin: new Date() });

    return {
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        createdAt: user.createdAt,
      },
      tokens,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException(AUTH_MESSAGES.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(AUTH_MESSAGES.INVALID_CREDENTIALS);
    }

    if (!user.isActive) {
      throw new UnauthorizedException(AUTH_MESSAGES.ACCOUNT_DEACTIVATED);
    }

    const tokens = await this.jwtService.generateTokens(user);

    await this.userModel.findByIdAndUpdate(user._id, { lastLogin: new Date() });

    return {
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        lastLogin: user.lastLogin,
      },
      tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    const payload = await this.jwtService.verifyRefreshToken(refreshToken);
    const user = await this.userModel.findById(payload.id);

    if (!user || !user.isActive) {
      throw new UnauthorizedException(AUTH_MESSAGES.INVALID_REFRESH_TOKEN);
    }

    const tokens = await this.jwtService.generateTokens(user);

    return {
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
      tokens,
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException(AUTH_MESSAGES.PASSWORD_RESET_EMAIL_SENT);
    }

    const resetPasswordToken = randomBytes(32).toString('hex');
    const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

    await this.userModel.findByIdAndUpdate(user._id, {
      resetPasswordToken,
      resetPasswordExpires,
    });

    return {
      message: AUTH_MESSAGES.PASSWORD_RESET_EMAIL_SENT,
      resetToken: resetPasswordToken, // In production, send via email
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, password } = resetPasswordDto;

    const user = await this.userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new BadRequestException(AUTH_MESSAGES.INVALID_RESET_TOKEN);
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(this.configService.get<string>('BCRYPT_ROUNDS', '10')),
    );

    await this.userModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      $unset: {
        resetPasswordToken: 1,
        resetPasswordExpires: 1,
      },
    });

    return {
      message: AUTH_MESSAGES.PASSWORD_RESET_SUCCESS,
    };
  }

  async getProfile(userId: string) {
    const user = await this.userModel.findById(userId).select('-password');
    if (!user) {
      throw new NotFoundException(AUTH_MESSAGES.USER_NOT_FOUND);
    }

    return {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const user = await this.userModel
      .findByIdAndUpdate(
        userId,
        { $set: updateProfileDto },
        { new: true, runValidators: true },
      )
      .select('-password');

    if (!user) {
      throw new NotFoundException(AUTH_MESSAGES.USER_NOT_FOUND);
    }

    return {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      isActive: user.isActive,
      updatedAt: user.updatedAt,
    };
  }

  async deactivateAccount(userId: string) {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true },
    );

    if (!user) {
      throw new NotFoundException(AUTH_MESSAGES.USER_NOT_FOUND);
    }

    return {
      message: AUTH_MESSAGES.ACCOUNT_DEACTIVATED,
    };
  }
}
