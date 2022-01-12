import { Injectable } from '@nestjs/common';
import {
  FilterQuery,
  Model,
  Types,
  Document,
  UpdateQuery,
  QueryOptions,
} from 'mongoose';
import { Dict } from '../interfaces';
import { CrudCountOptions, CrudListOptions } from '../utils/pagination';

@Injectable()
export class CrudService {
  async getList<T = any>(
    model: Model<T>,
    filters: FilterQuery<T>,
    options?: CrudListOptions,
  ) {
    let query = model.find({ ...filters });
    if (options?.sort) {
      query = query.sort(options?.sort);
    }
    if (options?.select) {
      query = query.select(options.select);
    }
    if (options?.pagination) {
      if (options?.pagination.skip) {
        query = query.skip(options?.pagination.skip);
      }
      query = query.limit(options?.pagination.count);
    }
    options?.populate?.forEach((pop) => {
      if (pop.select) {
        query = query.populate(pop.path, pop.select);
      } else {
        query = query.populate(pop.path);
      }
    });
    if (options?.hint) {
      query = query.hint(options.hint);
    }
    return query.lean().exec();
  }

  async getCount<T = any>(
    model: Model<T>,
    filters?: FilterQuery<T>,
    options?: CrudCountOptions,
  ): Promise<number> {
    if (!Object.keys(filters || {}).length) {
      return model.estimatedDocumentCount();
    }
    let query = model.countDocuments({ ...filters });
    if (options?.hint) {
      query = query.hint(options.hint);
    }
    return query.exec();
  }
}
