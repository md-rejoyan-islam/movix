import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { WishlistItem, WishlistItemSchema } from './schemas/wishlist.schema';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WishlistItem.name, schema: WishlistItemSchema },
    ]),
    AuthModule,
  ],
  controllers: [WishlistController],
  providers: [WishlistService],
  exports: [WishlistService],
})
export class WishlistModule {}
