import UserUtil, { User } from '../src/model/user'
import { TodoFolder } from '../src/model/todoFolder'
import { Todo } from '../src/model/todo'

import test, { todo } from 'ava'
import ph from 'password-hash'

async function deleteData(data: any[]) {
  if (data.length == 0) return
  const compose = data.map((i) => {
    return i.destory()
  })
  await Promise.all(compose)
}

async function destoryAll() {
  let todos = await Todo.findAll()
  let folders = await TodoFolder.findAll()
  let users = await User.findAll()

  await Promise.all([deleteData(todos), deleteData(folders), deleteData(users)])
  console.log('already delete all data')
}

async function fackerData() {
  const user = await UserUtil.createUser({
    username: 'yogo',
    email: 'su@km',
    password: '123456',
  })

  const todoFolder = TodoFolder.build({
    user_id: user.id,
    title: '生活',
  })

  await todoFolder.save()

  const todo_1 = Todo.build({
    text: '吃大餐！',
    completed: true,
    todo_folder_id: todoFolder.id,
  })

  const todo_2 = Todo.build({
    text: '睡大觉！',
    completed: false,
    todo_folder_id: todoFolder.id,
  })

  await todo_1.save()
  await todo_2.save()

  console.log('facker data finished')
}

test('test user create', async (t) => {
  await destoryAll()
  await fackerData()

  const user = await User.find({
    where: {
      email: 'su@km ',
    },
  })

  let folders = await user.getFolders()
  let todos = await folders[0].getTodos()

  t.is(folders[0].title, '生活')
  t.is(todos[0].completed, true)
  t.is(todos[0].text, '吃大餐！')
  t.is(ph.verify('123456', user.password), true)
})
