import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationRequest } from '../utils';

export class SortRequest {
  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  _sort?: string;

  @ApiProperty({ required: false, enum: ['DESC', 'ASC'] })
  @IsOptional()
  @IsString()
  @IsIn(['DESC', 'ASC'])
  _order?: 'DESC' | 'ASC';
}

export class SortWithPaginationRequest extends PaginationRequest {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  _sort?: string;

  @ApiProperty({ required: false, enum: ['DESC', 'ASC'] })
  @IsOptional()
  @IsString()
  @IsIn(['DESC', 'ASC'])
  _order?: 'DESC' | 'ASC';
}
