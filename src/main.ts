import { ApiConfigService } from '@common/config/api-config-service';
import { bootstrapServer, GlobalExceptionsFilter } from '@common/server';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // create nest app using Express
  const app = await NestFactory.create(AppModule);
  const apiConfigService = app.get(ApiConfigService);
  // bootstrap server
  bootstrapServer(app, { fastifyServer: false });
  app.setGlobalPrefix('/events-and-careers');
  app.useGlobalFilters(
    new GlobalExceptionsFilter(app.get(ApiConfigService), (res, code, data) =>
      res.send(data),
    ),
  );

  const options = new DocumentBuilder()
    .setTitle('Events And Careers Backend V1 Api')
    .setDescription('Events And Careers Backend API documentation')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document);

  const host = '0.0.0.0';
  const port = process.env.PORT || 8000;

  try {
    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
