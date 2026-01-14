import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Timestamps } from '../../types/timestamps.type';

export type UserDocument = User & Document;

interface TransformDocument {
  password?: string;
  __v?: number;
}

@Schema({
  timestamps: true,
  toJSON: {
    transform: (_doc, ret: TransformDocument) => {
      delete ret.password;
      delete ret.__v;
      return ret;
    },
  },
})
export class User extends Timestamps {
  _id: Types.ObjectId;

  @Prop({
    required: [true, 'Email is required!'],
    unique: [true, 'Email must be unique!'],
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({
    required: [true, 'Password is required!'],
    trim: true,
  })
  password: string;

  @Prop({
    required: [true, 'Full name is required!'],
    trim: true,
  })
  fullName: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: String })
  resetPasswordToken?: string;

  @Prop({ type: Date })
  resetPasswordExpires?: Date;

  @Prop({ type: Date })
  lastLogin?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
