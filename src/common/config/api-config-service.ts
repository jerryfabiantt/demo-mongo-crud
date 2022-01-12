import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  Environment,
  MongoDbConfig,
  JwtConfig,
  HealthConfig,
  ApiConfig,
  MiddlewareConfig,
} from './interfaces';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get appName(): string {
    return this.configService.get<string>('appName');
  }

  get mongodb(): MongoDbConfig {
    return this.configService.get<MongoDbConfig>('mongodb');
  }

  get serverTimezone(): string {
    return this.configService.get<string>('serverTimezone') || 'Asia/Dubai';
  }

  get debug(): boolean {
    return this.configService.get<boolean>('debug');
  }

  get env(): Environment {
    return this.configService.get<Environment>('env');
  }

  get jwt(): JwtConfig {
    return this.configService.get<JwtConfig>('jwt');
  }

  get liveOtp(): boolean {
    return this.configService.get<boolean>('liveOtp');
  }

  get maxFailedLoginAttempt(): number {
    return this.configService.get<number>('maxFailedLoginAttempt') || 5;
  }

  get passwordFirstReminderDays(): number {
    return this.configService.get<number>('passwordFirstReminderDays');
  }

  get passwordSecondReminderDays(): number {
    return this.configService.get<number>('passwordSecondReminderDays');
  }

  get passwordExpiryDays(): number {
    return this.configService.get<number>('passwordExpiryDays');
  }

  get health(): HealthConfig {
    return this.configService.get<HealthConfig>('health');
  }

  get middleware(): MiddlewareConfig {
    return this.configService.get<MiddlewareConfig>('middleware');
  }
}
