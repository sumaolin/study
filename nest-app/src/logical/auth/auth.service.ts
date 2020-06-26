import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from '../../utils/cryptogram';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * JWT验证 - step2 验证用户信息
   * @param username 用户名
   * @param password 密码
   */
  async validateUser(username: string, password: string): Promise<any> {
    console.log('JWT验证 - step2 验证用户信息');
    const user = await this.usersService.findOne(username);
    console.log(user);

    if (user) {
      const hashedPassword = user['password'];
      const salt = user['salt'];
      const hashPassword = encryptPassword(password, salt);
      if (hashedPassword === hashPassword) {
        return {
          code: 1,
          user,
        };
      } else {
        // 密码错误
        return {
          code: 2,
          user: null,
        };
      }
    } else {
      // 查无此人
      return {
        code: 3,
        user: null,
      };
    }
  }
  /**
   * JWT验证 - step3 处理 jwt 签证
   * @param user 用户信息
   */
  certificate(user: any) {
    console.log('JWT验证 - step3 处理 jwt 签证');
    const payload = {
      username: user.username,
      sub: user.userId,
      realName: user.realName,
      role: user.role,
    };
    try {
      const token = this.jwtService.sign(payload);
      return {
        code: 200,
        data: {
          token,
        },
        msg: '登录成功！',
      };
    } catch (error) {
      return {
        code: 600,
        msg: '账号或密码错误',
      };
    }
  }
}