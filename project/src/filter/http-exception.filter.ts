import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    const msgs = '我是filter Exception';
    console.log(exception);

    res.status(status).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }
}
