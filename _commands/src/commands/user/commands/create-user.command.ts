import { User, UserServiceModelCollectionNames } from '@common/entities/user';
import { InjectModel } from '@nestjs/mongoose';
import { randomBytes } from 'crypto';
import { hash } from 'argon2';
import { Model } from 'mongoose';
import { Command, CommandRunner } from 'nest-commander';

@Command({
  name: 'command:user:createUser',
  description: 'Create user',
})
export class CreateUserCommand implements CommandRunner {
  constructor(
    @InjectModel(UserServiceModelCollectionNames.User)
    private userModel: Model<User>,
  ) {}

  async run(passedParam: string[], options?: any): Promise<void> {
    const hashedPassword = await hash('test123', {
      salt: randomBytes(32),
    });

    const user = await this.userModel.create({
      firstName: 'admin',
      lastName: 'admin',
      phoneNumber: '+919037383380',
      avatar: '',
      dob: new Date(),
      email: 'admin@mailinator.com',
      gender: 'male',
      hashedPassword,
    });
    console.log('User ', user);
    process.exit(0);
  }
}
