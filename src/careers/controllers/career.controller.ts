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
import { CareerService } from 'src/careers/services/career.service';
import {
  CreateCareerDto,
  UpdateCareerDto,
  UpdateCareerStatusDto,
} from '../dto';

@Controller('career/v1')
@ApiTags('Career')
@ApiBearerAuth()
export class CareerController {
  @Inject() private careerService: CareerService;

  @Authorize()
  @Post('/')
  async create(@Body() body: CreateCareerDto, @Req() req: AuthRequest) {
    return this.careerService.create(body, req.currentUser);
  }

  @Get('/')
  async list(@Query() query: RequestWithFiltersDto) {
    const filters: FilterQuery<Event> = {
      ...query._filters,
    };
    const [list, count] = await Promise.all([
      this.careerService.getList(filters, {
        pagination: getPagination(query),
        sort: getSort(query),
      }),
      this.careerService.getCount(filters),
    ]);

    return {
      list: list,
      count: count,
    };
  }

  @Get('/:id')
  async read(@Param() params: ParamsIdRequest) {
    const event = await this.careerService.read(params.id);
    return event;
  }

  @Put('/:id')
  async update(
    @Param() params: ParamsIdRequest,
    @Body() body: UpdateCareerDto,
  ) {
    const event = await this.careerService.update(body, params.id);
    return event;
  }

  @Patch('/:id')
  async changeStatus(
    @Param() params: ParamsIdRequest,
    @Body() body: UpdateCareerStatusDto,
  ) {
    const event = await this.careerService.changeStatus(body, params.id);
    return event;
  }

  @Authorize()
  @Delete('/:id')
  async delete(@Param() params: ParamsIdRequest) {
    const event = await this.careerService.delete(params.id);
    return event;
  }
}
