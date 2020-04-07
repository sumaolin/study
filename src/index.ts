import Koa from 'koa'

const app = new Koa()

app.use(async ctx => {
  ctx.body = 'Todo App3'
})

app.listen(3000, () => {
  console.log('Server started On http://localhost:3000')
})
