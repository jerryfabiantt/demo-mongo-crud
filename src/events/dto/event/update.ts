import { Event, EventStatus } from '@common/entities/event';
import { Dict } from '@common/interfaces';
import { DateTransform } from '@common/validations';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateEventDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  coverPicture?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  images?: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Transform(DateTransform)
  date?: Date;
}

export class UpdateEventStatusDto {
  @ApiProperty({ required: true })
  @IsDefined()
  @IsString()
  @IsEnum(EventStatus)
  status: EventStatus;
}
