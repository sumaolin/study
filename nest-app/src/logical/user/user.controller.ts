import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('find-one')
  findOne(@Body() body: any) {
    console.log('findOne ', body);
    const user = this.userService.findOne(body.username);
    if (user) {
      return {
        code: 200,
        user,
      };
    } else {
      return {
        code: 400,
        msg: '未找到用户',
      };
    }
  }

  @Post('register')
  async register(@Body() body: any): Promise<any> {
    return await this.userService.register(body);
  }
}
