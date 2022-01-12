import { Event, EventStatus } from '@common/entities/event';
import { Dict } from '@common/interfaces';
import {
  DateTransform,
  IsStringObjectId,
  ObjectIdTransform,
} from '@common/validations';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsDefined, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreatEventDto implements Event {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  coverPicture?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  images?: string;

  @ApiProperty()
  @IsDefined()
  @IsDate()
  @Transform(DateTransform)
  date: Date;

  @IsOptional()
  @Transform(ObjectIdTransform)
  @IsStringObjectId()
  createdBy?: Types.ObjectId;

  @IsOptional()
  createdByUserDetails?: {
    firstName: string;
    lastName: string;
    _id: Types.ObjectId;
    avatar?: string;
    email: string;
  };
}
