import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { hash, verify } from 'argon2';
import { User, UserDocument } from '@common/entities/user/user.schema';
import {
  UserAuth,
  UserAuthDocument,
} from '@common/entities/user/user-auth.schema';
import { ApiConfigService } from '@common/config/api-config-service';
import { LoginDto } from '../dto';
import { Dict } from '@common/interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private apiConfigService: ApiConfigService,
  ) {}

  async login(user: LoginDto): Promise<{
    token: string;
    user: {
      id: Types.ObjectId;
      firstName: string;
      lastName: string;
      email: string;
      avatar?: string;
      emailVerified: boolean;
      role: string;
      phone: string;
    };
  }> {
    const { email, password } = user;
    const userRecord = await this.userModel.findOne({ email }).lean();
    if (!userRecord) {
      throw new NotFoundException('User not found');
    }
    const isPasswordCorrect = userRecord.hashedPassword
      ? await verify(userRecord.hashedPassword || '', password)
      : false;
    if (!isPasswordCorrect) {
      throw new UnauthorizedException(
        'Password entered is wrong ! Please enter correct password',
      );
    }
    const userDataInToken: Dict = {
      user: {
        id: userRecord._id,
        firstName: userRecord.firstName,
        lastName: userRecord.lastName,
        email: userRecord.email,
        avatar: userRecord.avatar,
        emailVerified: userRecord.emailVerified,
        role: userRecord.role,
        phone: userRecord.phoneNumber,
      },
    };

    const token = jwt.sign(
      { ...userDataInToken },
      this.apiConfigService.jwt.secret,
      {
        expiresIn: '1h',
      },
    );
    return {
      token,
      user: { ...userDataInToken.user },
    };
  }
}
