import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, FilterQuery } from 'mongoose';

import { Event, EventDocument } from '@common/entities/event/event.schema';
import { ApiConfigService } from '@common/config/api-config-service';
import { CreatEventDto, UpdateEventDto, UpdateEventStatusDto } from '../dto';
import { AuthenticatedUser, Dict } from '@common/interfaces';
import { CrudListOptions } from '@common/utils';
import { CrudModelService } from '@common/services/model.service';
import { CrudService } from '@common/services';

@Injectable()
export class EventService {
  private eventModelService: CrudModelService<Event>;
  constructor(
    @InjectModel(Event.name)
    private readonly eventModel: Model<EventDocument>,
  ) {
    this.eventModelService = new CrudModelService(eventModel);
  }

  async create(
    data: CreatEventDto,
    authUser: AuthenticatedUser,
  ): Promise<EventDocument> {
    data.createdBy = authUser.id;
    data.createdByUserDetails = {
      _id: authUser.id,
      firstName: authUser.firstName,
      lastName: authUser.lastName,
      email: authUser.email,
      avatar: authUser.avatar,
    };
    const event = await this.eventModel.create(data);
    return event;
  }

  async read(id: Types.ObjectId): Promise<Event> {
    const event = await this.eventModel.findOne({ _id: id }).lean();
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async delete(id: Types.ObjectId): Promise<any> {
    const event = await this.eventModel.findOne({ _id: id }).lean();
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    await this.eventModel.deleteOne({ _id: id });
    return { status: 'success', message: 'deleted successfully' };
  }

  async update(data: UpdateEventDto, id: Types.ObjectId): Promise<Event> {
    const event = await this.eventModel.findOne({ _id: id });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    event.name = data.name || event.name;
    event.description = data.description || event.description;
    event.date = data.date || event.date;
    event.coverPicture = data.coverPicture || event.coverPicture;
    event.images = data.images || event.images;

    await event.save();

    return event;
  }

  async changeStatus(
    data: UpdateEventStatusDto,
    id: Types.ObjectId,
  ): Promise<Event> {
    const event = await this.eventModel.findOne({ _id: id });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    event.status = data.status;
    await event.save();
    return event;
  }

  async getList(
    filters: FilterQuery<Event>,
    options?: CrudListOptions,
  ): Promise<any> {
    const respornse = await this.eventModelService.getList(filters, options);
    return respornse;
  }

  async getCount(filters: FilterQuery<Event>): Promise<any> {
    const respornse = await this.eventModelService.getCount(filters);
    return respornse;
  }
}
