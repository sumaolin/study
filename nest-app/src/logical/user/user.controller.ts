import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

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

  @UseGuards(AuthGuard('jwt'))
  @Post('register')
  async register(@Body() body: any): Promise<any> {
    return await this.userService.register(body);
  }

  @Post('login')
  async login(@Body() loginParmas: any) {
    console.log('JWT - step1: 用户请求登录');
    const authResult = await this.authService.validateUser(
      loginParmas.username,
      loginParmas.password,
    );

    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);

      case 2:
        return {
          code: 600,
          msg: '密码或账号不正确',
        };

      default:
        return {
          code: 600,
          msg: '查无此人',
        };
    }
  }
}
