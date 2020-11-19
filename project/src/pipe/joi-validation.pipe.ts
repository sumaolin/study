import * as Joi from 'joi';
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: Joi.ObjectSchema) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);

    // const { error } = await Joi.validate( value, this.schema );
    const { error } = this.schema.validate(value);

    console.log('JoiValidationPipe : ', error);
    if (error) {
      throw new BadRequestException(JSON.stringify(error));
    }
    return value;
  }
}
