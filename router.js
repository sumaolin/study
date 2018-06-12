const Router = require('koa-router')

const userRouter = new Router({
  prefix: '/user'
})

module.exports = app => {
  userRouter.get('/', async (ctx, next) => {
    ctx.response.body = `
    <form action="/user/register" method="post">
      <input name="name" type="text" placeholder="请输入用户名：ikcamp"/>
      <br/>
      <input name="password" type="text" placeholder="请输入密码：123456"/>
      <br/>
      <button>GoGoGo</button>
    </form>
    `
  })

  userRouter.get('/:id', async (ctx, next) => {
    ctx.response.body = 'user Id:' + ctx.params.id
    await next()
  })

  userRouter.post('/register', async (ctx, next) => {
    let { name, password } = ctx.request.body
    if (name == 'sumaolin' && password == '123456') {
      ctx.response.body = `hello ${name}`
    } else {
      ctx.response.body = '<h1>password error</h1>'
    }
    await next()
  })

  userRouter.get('/404', async (ctx, next) => {
    ctx.response.body = '<h1>404 page</h1>'
    await next()
  })

  userRouter.all('/*', async (ctx, next) => {
    console.log('all action')
    console.log(ctx.request.query)
    console.log(ctx.request.querystring)
    await next()
  })

  app.use(userRouter.routes())
}
