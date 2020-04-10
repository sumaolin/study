import Sequelize from 'sequelize'
import * as ph from 'password-hash'
import { resolve } from 'path'

const sq = new Sequelize('db', null, null, {
  dialect: 'sqlite',
  storage: resolve(__dirname, '../storage/db.sqlite3')
})
