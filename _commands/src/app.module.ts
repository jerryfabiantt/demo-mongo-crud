import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import config from './config';
import { userEntities } from '@common/entities/user';
import { allCommands } from './commands';
import { DbConnections } from './module/db';

const mongoDbOptions: MongooseModuleOptions = {
  keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  family: 4, // Use IPv4, skip trying IPv6
  useUnifiedTopology: true, // use the MongoDB driver's new connection management engine
  poolSize: 10,
};

@Module({
  imports: [
    MongooseModule.forRoot(config.mongodb.generalDbUrl, {
      ...mongoDbOptions,
      connectionName: DbConnections.User,
      dbName: DbConnections.User,
    }),

    MongooseModule.forFeature(userEntities, DbConnections.User),
  ],
  controllers: [],
  providers: [...allCommands],
})
export class AppModule {}
