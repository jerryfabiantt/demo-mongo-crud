import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/users/services/auth.service';
import { LoginDto } from '../dto';

@Controller('user/v1/auth')
@ApiTags('User Auth')
@ApiBearerAuth()
export class AuthController {
  @Inject() private authService: AuthService;

  @Post('/login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
