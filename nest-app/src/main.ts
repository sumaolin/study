import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { TransformInterceptor } from './interceptor/transform.interceptor';

const log = new LoggerMiddleware();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(log.use);

  app.useGlobalInterceptors(new TransformInterceptor());
  // app.setGlobalPrefix('nest-zero-to-one');
  await app.listen(3000);
}
bootstrap();
