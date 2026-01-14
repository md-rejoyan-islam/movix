import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Auth, CurrentUser } from '../common/decorators';
import type { IAuthenticatedUser } from '../common/interfaces';
import { AddWishlistDto } from './dto/add-wishlist.dto';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
@Auth()
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addToWishlist(
    @CurrentUser() user: IAuthenticatedUser,
    @Body() addWishlistDto: AddWishlistDto,
  ) {
    return this.wishlistService.addToWishlist(user.id, addWishlistDto);
  }

  @Get()
  async getWishlist(@CurrentUser() user: IAuthenticatedUser) {
    return this.wishlistService.getWishlist(user.id);
  }

  @Get('check/:movieId')
  async isInWishlist(
    @CurrentUser() user: IAuthenticatedUser,
    @Param('movieId', ParseIntPipe) movieId: number,
  ) {
    const isInWishlist = await this.wishlistService.isInWishlist(
      user.id,
      movieId,
    );
    return { isInWishlist };
  }

  @Delete(':movieId')
  @HttpCode(HttpStatus.OK)
  async removeFromWishlist(
    @CurrentUser() user: IAuthenticatedUser,
    @Param('movieId', ParseIntPipe) movieId: number,
  ) {
    return this.wishlistService.removeFromWishlist(user.id, movieId);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async clearWishlist(@CurrentUser() user: IAuthenticatedUser) {
    return this.wishlistService.clearWishlist(user.id);
  }
}
