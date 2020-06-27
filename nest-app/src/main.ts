import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { AllExceptionFilter } from './filter/any-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const log = new LoggerMiddleware();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(log.use);

  app.useGlobalInterceptors(new TransformInterceptor());
  // app.setGlobalPrefix('nest-zero-to-one');
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerOption = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest zero API')
    .setDescription('The nest-app API descript')
    .setVersion('1.0')
    .addTag('test')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOption);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(3000);
}
bootstrap();
