import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { JSONParseTransform } from '../validations';
import { SortWithPaginationRequest } from './sort';

export class RequestWithFiltersDto extends SortWithPaginationRequest {
  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @Transform(JSONParseTransform)
  _filters?: any;
}
