import { UserAuthSchema } from './user-auth.schema';
import { UserSchema } from './user.schema';

export enum UserServiceModelCollectionNames {
  UserAuth = 'UserAuth',
  User = 'User',
}

export const userEntities = [
  {
    name: UserServiceModelCollectionNames.User,
    schema: UserSchema,
  },
  {
    name: UserServiceModelCollectionNames.UserAuth,
    schema: UserAuthSchema,
  },
];
