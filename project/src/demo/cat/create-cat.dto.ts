import * as Joi from '@hapi/joi';

export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}

export const CreateCatSchema = {
  name: Joi.string().required(),
  age: Joi.number().required(),
  breed: Joi.string().required(),
};
