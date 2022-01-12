import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ApiConfigService } from '../config/api-config-service';
import { loadMiddlewares } from './middlewares';

export const bootstrapServer = (
  app: INestApplication,
  options?: { fastifyServer?: boolean },
) => {
  // load config from application
  const apiConfigService = app.get(ApiConfigService);

  // add middlewares to the app
  loadMiddlewares(app, apiConfigService, options);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      validationError: { target: false, value: false },
      validateCustomDecorators: true,
    }),
  );
};
