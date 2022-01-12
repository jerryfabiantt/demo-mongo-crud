import { User, Gender, UserStatus } from '@common/entities/user';
import { Dict } from '@common/interfaces';
import {
  DateTransform,
  IsStringObjectId,
  ObjectIdTransform,
} from '@common/validations';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDefined,
  IsEmail,
  IsEnum,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto implements User {
  @ApiProperty()
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  userType?: string;

  @ApiProperty()
  @IsDefined()
  @IsPhoneNumber(null)
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Transform(DateTransform)
  dob?: Date;

  @ApiProperty({ enum: Gender })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @IsOptional()
  @IsString()
  hashedPassword?: string;
}
