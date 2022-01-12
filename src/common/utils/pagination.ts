import { IsOptional, IsInt, IsBoolean, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { BooleanQueryTransform, IntTransform } from '../validations';
import { ApiProperty } from '@nestjs/swagger';
import { Dict } from '..';
import { SortOrder } from './mongo-query-utils';

export class PaginationRequest {
  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(IntTransform)
  @IsInt()
  _start?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(IntTransform)
  @IsInt()
  _end?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  _sort?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  _order?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(BooleanQueryTransform)
  @IsBoolean()
  _getcount?: boolean;
}

export interface Pagination {
  skip?: number;
  count: number;
  _order?: string;
  _sort?: string;
  getCount?: boolean;
}

export interface CrudFindOneOptions {
  sort?: Dict<SortOrder>;
  select?: any;
  populate?: { path: string; select?: any }[];
  hint?: any;
}

export interface CrudListOptions extends CrudFindOneOptions {
  pagination?: Pagination;
}

export interface CrudCountOptions {
  hint?: any;
}

export const getPagination = (paginationReq: PaginationRequest): Pagination => {
  if (
    !paginationReq ||
    paginationReq._start === undefined ||
    paginationReq._end === undefined
  ) {
    return undefined;
  }
  return {
    count: Math.max(paginationReq._end - paginationReq._start, 1),
    skip: Math.max(paginationReq._start, 0),
    _order: paginationReq._order,
    _sort: paginationReq._sort,
    getCount: paginationReq._getcount,
  };
};
