import sq from '../db'
import Sequelize from 'sequelize'
import ph from 'password-hash'
import { createSecureServer } from 'http2'

interface IUser {
  username: string
  email: string
  password: string
}

const User = sq.define<any, IUser>(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: Sequelize.STRING,
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
)

export default {
  async createUser(user: IUser) {
    return User.create({
      username: user.username,
      email: user.email,
      password: user.password,
    })
  },
  getOne: User.findById,
}

export { User }
