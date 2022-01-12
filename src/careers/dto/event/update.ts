import { OpeningStatus } from '@common/entities/career';
import { Event, EventStatus } from '@common/entities/event';
import { Dict } from '@common/interfaces';
import { DateTransform } from '@common/validations';
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

export class UpdateCareerDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  post: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  skillSet: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  jobDescription: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  responsibilities: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  requirements: string;

  @ApiProperty()
  @IsOptional()
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
}

export class UpdateCareerStatusDto {
  @ApiProperty({ required: true })
  @IsDefined()
  @IsString()
  @IsEnum(OpeningStatus)
  status: OpeningStatus;
}
