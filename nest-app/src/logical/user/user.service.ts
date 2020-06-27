import { Injectable, Post } from '@nestjs/common';
import * as Sequelize from 'sequelize';
import sequelize from '../../database/sequelize';
import { makeSalt, encryptPassword } from 'src/utils/cryptogram';

@Injectable()
export class UserService {
  /**
   * 查询是否有该用户
   * @param username 用户名称
   */
  async findOne(username: string): Promise<any | undefined> {
    const sql = `SELECT user_id id, account_name username, real_name realName, role, passwd password, passwd_salt salt FROM admin_user WHERE account_name = '${username}'`;

    try {
      const res = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
        logging: true,
      });
      const user = res[0];
      return user;
    } catch (error) {
      console.log(error);
      return void 0;
    }
  }
  /**
   * 注册
   * @param requestBody 请求体body
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async register(requestBody: any): Promise<any> {
    const { accountName, realName, password, repassword, mobile } = requestBody;
    if (password !== repassword) {
      return {
        code: 400,
        msg: '两次输入密码不一致',
      };
    }

    const user = await this.findOne(accountName);
    if (user) {
      return {
        code: 400,
        msg: '用户已存在',
      };
    }

    const salt = makeSalt();
    const hashPwd = encryptPassword(password, salt);
    const registerSql = `
      INSERT INTO admin_user
        (account_name, real_name, passwd, passwd_salt, mobile, user_status, role, create_by)
      VALUE
        ('${accountName}','${realName}','${hashPwd}','${salt}','${mobile}', 1,3,0)
    `;

    try {
      await sequelize.query(registerSql, { logging: true });
      return {
        code: 200,
        msg: '注册成功',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `server error : ${error}`,
      };
    }
  }
}
