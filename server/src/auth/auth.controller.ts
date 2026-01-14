import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { Auth, CurrentUser } from '../common/decorators';
import type { IAuthenticatedUser } from '../common/interfaces';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDto,
  LoginDto,
  RefreshTokenDto,
  RegisterDto,
  ResetPasswordDto,
  UpdateProfileDto,
} from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser() user: IAuthenticatedUser) {
    return this.authService.getProfile(user.id);
  }

  @Patch('profile')
  @Auth()
  async updateProfile(
    @CurrentUser() user: IAuthenticatedUser,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return await this.authService.updateProfile(user.id, updateProfileDto);
  }

  @Delete('account')
  @Auth()
  @HttpCode(HttpStatus.OK)
  async deactivateAccount(@CurrentUser() user: IAuthenticatedUser) {
    return await this.authService.deactivateAccount(user.id);
  }
}
