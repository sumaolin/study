import { Controller, Get, Post, Body, UsePipes } from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto, CreateCatSchema } from './create-cat.dto';
import { JoiValidationPipe } from '../../pipe/joi-validation.pipe';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}
  @Get('all')
  async all() {
    return this.catService.getAll();
  }

  @Get()
  async cats() {
    return this.catService.detail();
  }

  @Post()
  @UsePipes(new JoiValidationPipe(CreateCatSchema))
  async create(@Body() cat: CreateCatDto) {
    return this.catService.create(cat);
  }
}
