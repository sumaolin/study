import Sequelize from 'sequelize'
import { resolve } from 'path'

const sq = new Sequelize('todo', null, null, {
  dialect: 'sqlite',
  storage: resolve(__dirname, '../storage/todo.db3'),
})

export default sq
