import sq from '../db'
import Sequelize from 'sequelize'
import { User } from './user'

const TodoFolder = sq.define<any, any>(
  'todo_folder',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.TEXT,
    },
    user_id: {
      type: Sequelize.INTEGER,
      reference: {
        Modal: User,
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
)

User.hasMany(TodoFolder, {
  constraints: false,
  as: 'Folders',
  foreignKey: 'user_id',
})

export { TodoFolder }
