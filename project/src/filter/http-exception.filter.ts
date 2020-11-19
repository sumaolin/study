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
    // console.log(exception);
    let status = 403;
    let msg = 'filter Exception : ';
    if (exception instanceof HttpException) {
      const e = exception as HttpException;
      status = e.getStatus();
      msg = msg + e.message;
    }

    res.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: req.url,
      msg,
    });
  }
}
