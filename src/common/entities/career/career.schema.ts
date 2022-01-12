import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';
import { enumToStringArray } from '../../utils/index';

export enum OpeningStatus {
  Pending = 'pending',
  Open = 'open',
  Filled = 'filled',
  archived = 'archived',
}

@Schema()
export class Career {
  @ApiProperty()
  @IsDefined()
  @Prop({
    type: String,
    required: [true, 'title is required'],
    trim: true,
  })
  title: string;

  @ApiProperty()
  @IsDefined()
  @Prop({
    type: String,
    required: [true, 'post is required'],
    trim: true,
  })
  post: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @Prop({
    type: String,
    required: [true, 'skill_set is required'],
  })
  skillSet: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @Prop({
    type: String,
    required: [true, 'jobDescription is required'],
  })
  jobDescription: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @Prop({
    type: String,
    required: [true, 'responsibilities is required'],
  })
  responsibilities: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @Prop({
    type: String,
    required: [true, 'requirements is required'],
  })
  requirements: string;

  @IsOptional()
  @Prop({
    type: String,
    default: OpeningStatus.Pending,
    enum: enumToStringArray(OpeningStatus),
  })
  status?: OpeningStatus;

  @IsDefined()
  @Prop({
    type: Number,
    default: 1,
  })
  vacancy: number;

  @ApiProperty()
  @IsOptional()
  @Prop({
    type: Date,
    required: [true, 'date is required'],
  })
  closingDate?: Date;

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

export const CareerSchema = SchemaFactory.createForClass(Career);

CareerSchema.set('timestamps', true);
CareerSchema.index({ createdAt: 1 });
CareerSchema.index({ updatedAt: 1 });

export type CareerDocument = Career & Document;
