import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, FilterQuery } from 'mongoose';
import { randomBytes } from 'crypto';
import { hash, verify } from 'argon2';
import {
  User,
  UserDocument,
  UserStatus,
} from '@common/entities/user/user.schema';
import {
  UserAuth,
  UserAuthDocument,
} from '@common/entities/user/user-auth.schema';
import { CreateUserDto } from '../dto';
import { getOtherValuesFromEnum } from '@common/utils';

@Injectable()
export class UserCRUDService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(User.name)
    private readonly userAuthModel: Model<UserAuthDocument>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    if (user.password) {
      user.hashedPassword = await hash(user.password, {
        salt: randomBytes(32),
      });
    }
    await this.checkEmailExist(user.email);
    const createdUser = await this.userModel.create(user);
    return createdUser;
  }

  async checkEmailExist(email: string, userId?: Types.ObjectId) {
    const filter: FilterQuery<User> = {
      email,
      emailVerified: true,
      status: {
        $in: getOtherValuesFromEnum(UserStatus, [UserStatus.Archive]),
      },
    };
    if (userId) {
      filter._id = { $ne: userId };
    }
    const user = await this.userModel.findOne(filter).lean();
    if (user) {
      throw new BadRequestException('Email already exists');
    }
    return true;
  }
}
