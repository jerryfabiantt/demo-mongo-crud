import {
  loadMongoDbConfig,
  loadJwtConfig,
  loadMiddlewareConfig,
  validate,
} from '@common/config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { allEntities } from '@common/entities/common';
import { globalServices } from '@common/index';
import { AclGuard } from '@common/decorators';
import { APP_GUARD } from '@nestjs/core';
import {
  controllers as UserControllers,
  services as UserServices,
} from './users/module';
import {
  controllers as EventControllers,
  services as EntityServices,
} from './events/module';
import {
  controllers as CareerControllers,
  services as CareerServices,
} from './careers/module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loadMongoDbConfig, loadJwtConfig, loadMiddlewareConfig],
      cache: true,
      isGlobal: true,
      validate,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URL'),
        keepAlive: true,
        useNewUrlParser: true,
        family: 4, // Use IPv4, skip trying IPv6
        useUnifiedTopology: true, // use the MongoDB driver's new connection management engine
        // useCreateIndex: true,
        // poolSize: 100,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature(allEntities),
  ],
  controllers: [
    ...UserControllers,
    ...EventControllers,
    ...CareerControllers,
    AppController,
  ],
  providers: [
    ...globalServices,
    {
      provide: APP_GUARD,
      useClass: AclGuard,
    },
    ...UserServices,
    ...EntityServices,
    ...CareerServices,
    AppService,
  ],
})
export class AppModule {}
