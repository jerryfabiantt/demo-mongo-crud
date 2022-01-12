import {
  FilterQuery,
  Model,
  QueryOptions,
  Types,
  UpdateQuery,
  Document,
} from 'mongoose';

import { CrudService } from './mongo-query-services';
import { Dict } from '../interfaces';
import { CrudCountOptions, CrudListOptions } from '@common/utils';

export class CrudModelService<T> {
  private crudService: CrudService;
  constructor(private model: Model<T>) {
    this.crudService = new CrudService();
  }

  async getList(filters: FilterQuery<T>, options?: CrudListOptions) {
    return this.crudService.getList(this.model, filters, options);
  }

  async getCount(
    filters?: FilterQuery<T>,
    options?: CrudCountOptions,
  ): Promise<number> {
    return this.crudService.getCount(this.model, filters, options);
  }
}
