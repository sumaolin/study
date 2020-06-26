import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

const log = new LoggerMiddleware();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(log.use);
  await app.listen(3000);
}
bootstrap();
