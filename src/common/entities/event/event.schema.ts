import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';
import { enumToStringArray } from '../../utils/index';

export enum EventStatus {
  Pending = 'pending',
  Completed = 'completed',
  archived = 'archived',
  Active = 'active',
}

@Schema()
export class Event {
  @ApiProperty()
  @IsDefined()
  @Prop({
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  })
  name: string;

  @ApiProperty()
  @IsDefined()
  @Prop({
    type: String,
    required: [true, 'description is required'],
    trim: true,
  })
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Prop({
    type: String,
  })
  coverPicture?: string;

  @IsOptional()
  @IsString()
  @Prop({
    type: String,
  })
  images?: string;

  @IsOptional()
  @Prop({
    type: String,
    default: EventStatus.Pending,
    enum: enumToStringArray(EventStatus),
  })
  status?: EventStatus;

  @ApiProperty()
  @IsDefined()
  @Prop({
    type: Date,
    required: [true, 'date is required'],
  })
  date: Date;

  @IsOptional()
  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy?: Types.ObjectId;

  @IsOptional()
  @Prop({
    type: Object,
    firstName: String,
    lastName: String,
    _id: Types.ObjectId,
    avatar: String,
    email: String,
  })
  createdByUserDetails?: {
    firstName: string;
    lastName: string;
    _id: Types.ObjectId;
    avatar?: string;
    email: string;
  };
}

export const EventSchema = SchemaFactory.createForClass(Event);

EventSchema.set('timestamps', true);
EventSchema.index({ createdAt: 1 });
EventSchema.index({ updatedAt: 1 });

export type EventDocument = Event & Document;
