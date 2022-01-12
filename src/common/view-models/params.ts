import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { Types } from 'mongoose';
import { IsStringObjectId, ObjectIdTransform } from '../validations';

export class ParamsIdRequest {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsStringObjectId()
  @Transform(ObjectIdTransform)
  id: Types.ObjectId;
}
