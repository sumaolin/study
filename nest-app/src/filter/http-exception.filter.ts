import {
  HttpException,
  ArgumentsHost,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../utils/log4js';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Request originalUrl : ${req.originalUrl}
    Method:  ${req.method}
    IP: ${req.ip}
    status code: ${status}
    Response: ${exception.toString()} \n   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    `;
    Logger.info(logFormat);
    res.status(status).json({
      statusCode: status,
      error: exception.message,
      msg: `${status >= 500 ? 'Server error' : 'Client Error'}`,
    });
  }
}
