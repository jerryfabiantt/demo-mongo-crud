import { Types } from 'mongoose';

export type Dict<T = any> = { [key: string]: T };
export type NumDict<T = any> = { [key: number]: T };

export type Registry<T = any> = Dict<T>;

export interface ModelBase {
  _id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export type MongoDbSelect<M> = Partial<{ [T in keyof M]: 1 | 0 }>;
export type MongoDbSort<M> = Partial<{ [T in keyof M]: 1 | -1 }>;
