import sq from '../db'
import Sequelize from 'sequelize'
import { TodoFolder } from './todoFolder'

const Todo = sq.define<any, any>(
  'todo',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: Sequelize.TEXT,
    },
    completed: {
      type: Sequelize.BOOLEAN,
    },
    todo_folder_id: {
      type: Sequelize.INTEGER,
      reference: {
        modal: TodoFolder,
        key: 'id',
      },
    },
  },
  {
    freezeTableName: true,
  }
)

TodoFolder.hasMayn(Todo, { as: 'Todos', foreignKey: 'todo_folder_id' })

export { Todo }
