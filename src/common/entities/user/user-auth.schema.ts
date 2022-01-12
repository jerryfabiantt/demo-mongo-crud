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

@Schema()
export class UserAuth {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @IsOptional()
  @Prop()
  hashedPassword?: string;

  @IsOptional()
  @Prop()
  otp?: string;

  @IsOptional()
  @Prop()
  otpExpiryAt?: Date;
}

export const UserAuthSchema = SchemaFactory.createForClass(UserAuth);

UserAuthSchema.set('timestamps', true);
UserAuthSchema.index({ createdAt: 1 });
UserAuthSchema.index({ updatedAt: 1 });

export type UserAuthDocument = UserAuth & Document;
