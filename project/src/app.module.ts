import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { CatModule } from './demo/cat/cat.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { log } from './middleware/log';

@Module({
  imports: [CatModule],
})
export class AppModule implements NestModule {
  configure(cm: MiddlewareConsumer) {
    cm.apply(LoggerMiddleware)
      .exclude({ path: '/admin/cat/all', method: RequestMethod.GET })
      .forRoutes('cat');
  }
}
