import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import * as Joi from '@hapi/joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: object) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = Joi.valid(value, this.schema);
    if (error) {
      return new BadRequestException('validation failed');
    }
    return value;
  }
}
