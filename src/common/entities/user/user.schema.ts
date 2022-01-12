import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Document, Types } from 'mongoose';
import { enumToStringArray } from '../../utils/index';

export enum UserStatus {
  Archive = 'archive',
  Active = 'active',
}

export enum RoleType {
  SuperAdmin = 'superAdmin',
  Admin = 'admin',
  Candidate = 'candidate',
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
  DonotSepecify = 'doNotSpecify',
}

@Schema()
export class User {
  @ApiProperty()
  @IsDefined()
  @Prop({
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
  })
  firstName: string;

  @ApiProperty()
  @IsDefined()
  @Prop({
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
  })
  lastName: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsEmail()
  @Prop({
    type: String,
    required: [true, 'Email is required'],
  })
  email?: string;

  @IsOptional()
  @Prop({ type: Boolean, default: false })
  emailVerified?: boolean;

  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsPhoneNumber(null)
  @Prop({
    type: String,
    required: [true, 'Phone Number is required'],
  })
  phoneNumber: string;

  @IsOptional()
  @Prop({ type: Boolean, default: false })
  phoneVerified?: boolean;

  @IsOptional()
  @Prop({
    type: String,
    default: UserStatus.Active,
    enum: enumToStringArray(UserStatus),
  })
  status?: UserStatus;

  @IsOptional()
  @Prop({
    type: String,
    enum: enumToStringArray(RoleType),
  })
  role?: RoleType;

  @IsOptional()
  @Prop({
    type: String,
    enum: enumToStringArray(Gender),
  })
  gender?: Gender;

  @IsOptional()
  @Prop({
    type: Date,
    required: [true, 'DOB is required'],
  })
  dob?: Date;

  @IsOptional()
  @Prop()
  hashedPassword?: string;

  @IsOptional()
  @Prop()
  avatar?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('timestamps', true);
UserSchema.index({ createdAt: 1 });
UserSchema.index({ updatedAt: 1 });

export type UserDocument = User & Document;
