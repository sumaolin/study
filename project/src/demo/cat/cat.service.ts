import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';

const catList = [];
@Injectable()
export class CatService {
  getAll() {
    return 'all cat service connect with module cat';
  }

  detail() {
    return 'miao miao';
  }

  create(cat: CreateCatDto) {
    catList.push(cat);
    return catList;
  }
}
