import Sequelize from 'sequelize'
import * as ph from 'password-hash'
import { resolve } from 'path'

const sq = new Sequelize('todo', null, null, {
  dialect: 'sqlite',
  storage: resolve(__dirname, '../storage/todo.db3'),
})

var User = sq.define(
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
    password: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
)

User.create({
  username: 'yougo',
  email: 'su@km.com',
  password: ph.generate('1234455'),
}).then((r) => {
  console.log(r)
})
