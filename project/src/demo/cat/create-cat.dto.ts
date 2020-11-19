import * as Joi from 'joi';
import { IsString, IsInt } from 'class-validator';
export class CreateCatDto {
  @IsString()
  name: string;
  @IsInt()
  age: number;
  @IsString()
  breed: string;
}

export const CreateCatSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  breed: Joi.string().required(),
});
