import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { IsStringObjectId, ObjectIdTransform } from '../validations';

export class IdRequest {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsStringObjectId()
  @Transform(ObjectIdTransform)
  _id: Types.ObjectId;
}

export class OptionalIdRequest {
  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsStringObjectId()
  @Transform(ObjectIdTransform)
  id?: Types.ObjectId;
}
