const Koa = require('koa')
// 后面加()
const Router = require('koa-router')
const app = new Koa()

const irouter = new Router({
  prefix: '/users'
})
irouter.get('/', async (ctx, next) => {
  ctx.response.body = '<h1>index page</h1>'
  await next()
})

irouter.get('/:id', async (ctx, next) => {
  ctx.response.body = 'user Id:' + ctx.params.id
  await next()
})

irouter.get('/home', async (ctx, next) => {
  ctx.response.body = '<h1>home page</h1>'
  await next()
})

irouter.get('/404', async (ctx, next) => {
  ctx.response.body = '<h1>404 page</h1>'
  await next()
})

irouter.all('/*', async (ctx, next) => {
  console.log('all action')
  await next()
})

app.use(irouter.routes())
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
