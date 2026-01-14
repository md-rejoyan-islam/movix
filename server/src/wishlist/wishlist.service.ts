import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WISHLIST_MESSAGES } from '../common/constants';
import { AddWishlistDto } from './dto/add-wishlist.dto';
import { WishlistDocument, WishlistItem } from './schemas/wishlist.schema';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(WishlistItem.name)
    private wishlistModel: Model<WishlistDocument>,
  ) {}

  async addToWishlist(userId: string, addWishlistDto: AddWishlistDto) {
    const existingItem = await this.wishlistModel.findOne({
      userId,
      movieId: addWishlistDto.movieId,
    });

    if (existingItem) {
      throw new ConflictException(WISHLIST_MESSAGES.ITEM_ALREADY_EXISTS);
    }

    const wishlistItem = await this.wishlistModel.create({
      userId,
      ...addWishlistDto,
      addedAt: new Date(),
    });

    return wishlistItem;
  }

  async getWishlist(userId: string) {
    const wishlistItems = await this.wishlistModel.find({ userId }).sort({
      addedAt: -1,
    });

    return wishlistItems.map((item) => ({
      id: item._id,
      movieId: item.movieId,
      title: item.title,
      poster_path: item.poster_path,
      vote_average: item.vote_average,
      release_date: item.release_date,
      type: item.type,
      addedAt: item.addedAt,
    }));
  }

  async removeFromWishlist(userId: string, movieId: number) {
    const result = await this.wishlistModel.findOneAndDelete({
      userId,
      movieId,
    });

    if (!result) {
      throw new NotFoundException(WISHLIST_MESSAGES.ITEM_NOT_FOUND);
    }

    return { message: WISHLIST_MESSAGES.ITEM_REMOVED };
  }

  async isInWishlist(userId: string, movieId: number): Promise<boolean> {
    const item = await this.wishlistModel.findOne({ userId, movieId });
    return !!item;
  }

  async clearWishlist(userId: string) {
    await this.wishlistModel.deleteMany({ userId });
    return { message: WISHLIST_MESSAGES.WISHLIST_CLEARED };
  }
}
