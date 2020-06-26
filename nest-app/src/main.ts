import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { LoggerMiddleware } from './middleware/logger.middleware';

const log = new LoggerMiddleware();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(log.use);
  await app.listen(3000);
}
bootstrap();
