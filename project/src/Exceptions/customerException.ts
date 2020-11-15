import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomerException extends HttpException {
  constructor() {
    super('禁止访问2', HttpStatus.FORBIDDEN);
  }
}
