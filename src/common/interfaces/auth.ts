import { Types } from 'mongoose';

export interface AuthenticatedUser {
  id: Types.ObjectId;
  firstName: string;
  lastName: string;
  avatar?: string;
  userType?: string;
  email: string;
  emailVerified: boolean;
  role: string;
  phone: string;
}

export interface AuthRequest {
  currentUser: AuthenticatedUser;
  permission?: string;
}
