import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AUTH_MESSAGES } from '../../common/constants';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findById(id: string) {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) {
      throw new NotFoundException(AUTH_MESSAGES.USER_NOT_FOUND);
    }
    return user;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async updateById(id: string, updates: Partial<User>) {
    const user = await this.userModel
      .findByIdAndUpdate(id, updates, { new: true })
      .select('-password');
    if (!user) {
      throw new NotFoundException(AUTH_MESSAGES.USER_NOT_FOUND);
    }
    return user;
  }

  async deactivateAccount(id: string) {
    const user = await this.userModel
      .findByIdAndUpdate(id, { isActive: false }, { new: true })
      .select('-password');
    if (!user) {
      throw new NotFoundException(AUTH_MESSAGES.USER_NOT_FOUND);
    }
    return { message: 'Account deactivated successfully' };
  }
}
