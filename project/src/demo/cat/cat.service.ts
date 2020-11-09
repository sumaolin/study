import { Injectable } from '@nestjs/common';

@Injectable()
export class CatService {
  getAll() {
    return 'all cat service connect with module cat';
  }
}
