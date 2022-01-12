import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, FilterQuery } from 'mongoose';

import {
  Career,
  CareerDocument,
  OpeningStatus,
} from '@common/entities/career/career.schema';
import { ApiConfigService } from '@common/config/api-config-service';
import {
  CreateCareerDto,
  UpdateCareerDto,
  UpdateCareerStatusDto,
} from '../dto';
import { AuthenticatedUser, Dict } from '@common/interfaces';
import { CrudListOptions } from '@common/utils';
import { CrudModelService } from '@common/services/model.service';
import { CrudService } from '@common/services';

@Injectable()
export class CareerService {
  private careerModelService: CrudModelService<Career>;
  constructor(
    @InjectModel(Career.name)
    private readonly careerModel: Model<CareerDocument>,
  ) {
    this.careerModelService = new CrudModelService(careerModel);
  }

  async create(
    data: CreateCareerDto,
    authUser: AuthenticatedUser,
  ): Promise<CareerDocument> {
    data.createdBy = authUser.id;
    data.createdByUserDetails = {
      _id: authUser.id,
      firstName: authUser.firstName,
      lastName: authUser.lastName,
      email: authUser.email,
      avatar: authUser.avatar,
    };
    const career = await this.careerModel.create(data);
    return career;
  }

  async read(id: Types.ObjectId): Promise<Career> {
    const career = await this.careerModel.findOne({ _id: id }).lean();
    if (!career) {
      throw new NotFoundException('Event not found');
    }
    return career;
  }

  async update(data: UpdateCareerDto, id: Types.ObjectId): Promise<Career> {
    const career = await this.careerModel.findOne({ _id: id });
    if (!career) {
      throw new NotFoundException('Event not found');
    }
    career.title = data.title || career.title;
    career.post = data.post || career.post;
    career.skillSet = data.skillSet || career.skillSet;
    career.jobDescription = data.jobDescription || career.jobDescription;
    career.responsibilities = data.responsibilities || career.responsibilities;
    career.requirements = data.requirements || career.requirements;
    career.closingDate = data.closingDate || career.closingDate;

    await career.save();

    return career;
  }

  async changeStatus(
    data: UpdateCareerStatusDto,
    id: Types.ObjectId,
  ): Promise<Career> {
    const career = await this.careerModel.findOne({ _id: id });
    if (!career) {
      throw new NotFoundException('Event not found');
    }
    career.status = data.status;
    await career.save();
    return career;
  }

  async delete(id: Types.ObjectId): Promise<any> {
    const event = await this.careerModel.findOne({ _id: id }).lean();
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    await this.careerModel.deleteOne({ _id: id });
    return { status: 'success', message: 'deleted successfully' };
  }

  async getList(
    filters: FilterQuery<Event>,
    options?: CrudListOptions,
  ): Promise<any> {
    const careerList = await this.careerModelService.getList(filters, options);
    return careerList;
  }

  async getCount(filters: FilterQuery<Event>): Promise<any> {
    const count = await this.careerModelService.getCount(filters);
    return count;
  }
}
