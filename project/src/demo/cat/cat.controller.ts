import { Controller, Get } from '@nestjs/common';
import { CatService } from './cat.service';
import { log } from 'util';
import { get } from 'http';

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
}
