import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Timestamps } from '../../types/timestamps.type';

export type WishlistDocument = WishlistItem & Document;

export type MediaType = 'movie' | 'tv';

interface TransformDocument {
  __v?: number;
}

@Schema({
  timestamps: true,
  toJSON: {
    transform: (_doc, ret: TransformDocument) => {
      delete ret.__v;
      return ret;
    },
  },
})
export class WishlistItem extends Timestamps {
  _id: Types.ObjectId;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  movieId: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  poster_path: string;

  @Prop({ required: true, type: Number })
  vote_average: number;

  @Prop({ required: true })
  release_date: string;

  @Prop({
    required: true,
    type: String,
    enum: ['movie', 'tv'],
  })
  type: MediaType;

  addedAt: Date;
}

export const WishlistItemSchema = SchemaFactory.createForClass(WishlistItem);

WishlistItemSchema.index({ userId: 1, movieId: 1 }, { unique: true });
WishlistItemSchema.index({ userId: 1 });
