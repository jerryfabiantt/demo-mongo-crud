import { Authorize } from '@common/decorators';
import { AuthRequest } from '@common/interfaces';
import { getPagination, getSort } from '@common/utils';
import { ParamsIdRequest, RequestWithFiltersDto } from '@common/view-models';
import { FilterQuery } from 'mongoose';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EventService } from 'src/events/services/event.service';
import { CreatEventDto, UpdateEventDto, UpdateEventStatusDto } from '../dto';

@Controller('event/v1')
@ApiTags('Event')
@ApiBearerAuth()
export class EventController {
  @Inject() private eventService: EventService;

  @Authorize()
  @Post('/')
  async create(@Body() body: CreatEventDto, @Req() req: AuthRequest) {
    return this.eventService.create(body, req.currentUser);
  }

  @Get('/')
  async list(@Query() query: RequestWithFiltersDto) {
    const filters: FilterQuery<Event> = {
      ...query._filters,
    };
    const [list, count] = await Promise.all([
      this.eventService.getList(filters, {
        pagination: getPagination(query),
        sort: getSort(query),
      }),
      this.eventService.getCount(filters),
    ]);

    return {
      list: list,
      count: count,
    };
  }
  @Get('/:id')
  async read(@Param() params: ParamsIdRequest) {
    const event = await this.eventService.read(params.id);
    return event;
  }

  @Put('/:id')
  async update(@Param() params: ParamsIdRequest, @Body() body: UpdateEventDto) {
    const event = await this.eventService.update(body, params.id);
    return event;
  }

  @Patch('/:id')
  async changeStatus(
    @Param() params: ParamsIdRequest,
    @Body() body: UpdateEventStatusDto,
  ) {
    const event = await this.eventService.changeStatus(body, params.id);
    return event;
  }

  @Authorize()
  @Delete('/:id')
  async delete(@Param() params: ParamsIdRequest) {
    const event = await this.eventService.delete(params.id);
    return event;
  }
}
