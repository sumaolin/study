import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { CustomerException } from './Exceptions/customerException';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './filter/http-exception.filter';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('getException')
  // @UseFilters(HttpExceptionFilter)
  async getException() {
    throw new Error('错误test');
    // throw new HttpException('禁止访问', HttpStatus.FORBIDDEN);
    // throw new CustomerException(); // 推荐自定义
    // throw new HttpException(
    //   {
    //     status: 405,
    //     error: '禁止访问3',
    //   },
    //   404, // http 错误码
    // );
  }
}
