/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtContants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwfFromRequest: ExtractJwt.fromAuthHeaderAsBeareToken(),
      ignoreExpiration: false,
      secretKey: jwtContants.secret,
    });
  }

  async validate(payload: any) {
    console.log('JWT验证 step4: 被守卫调用');
    return {
      userId: payload.sub,
      username: payload.username,
      realName: payload.realName,
      role: payload.role,
    };
  }
}
