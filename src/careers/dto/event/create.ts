import { Career, OpeningStatus } from '@common/entities/career';
import { Dict } from '@common/interfaces';
import {
  DateTransform,
  IsStringObjectId,
  ObjectIdTransform,
} from '@common/validations';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateCareerDto implements Career {
  @ApiProperty()
  @IsDefined()
  @IsString()
  title: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  post: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  skillSet: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  jobDescription: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  responsibilities: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  requirements: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  vacancy: number;

  @IsOptional()
  @IsEnum(OpeningStatus)
  status?: OpeningStatus;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Transform(DateTransform)
  closingDate?: Date;

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
