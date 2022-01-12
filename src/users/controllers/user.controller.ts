import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserCRUDService } from 'src/users/services/users-crud.service';
import { CreateUserDto } from '../dto';

@Controller('user/v1/')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  @Inject() private userCRUDService: UserCRUDService;

  @Post()
  async create(@Body() body: CreateUserDto) {
    return this.userCRUDService.create(body);
  }
}
