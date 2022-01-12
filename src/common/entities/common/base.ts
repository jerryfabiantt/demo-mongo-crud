import { Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';
import { ObjectIdTransform } from '../../validations';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class ModelBase {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(ObjectIdTransform)
  _id?: Types.ObjectId;

  @Exclude({ toClassOnly: true })
  createdAt?: Date;

  @Exclude({ toClassOnly: true })
  updatedAt?: Date;
}
