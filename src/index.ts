import Koa from 'koa'
import Router from 'koa-better-router'
import bodyParser from 'koa-better-body'
import Convert from 'koa-convert'

const router = Router().loadMethods()
const app = new Koa()

router.get('/hello', async (ctx, next) => {
  ctx.body = `Hello world! prefix: ${ctx.route.prefix}`
  await next()
})

router.get('/foobar', async (ctx, next) => {
  ctx.body = `Foo Bar Baz! ${ctx.route.prefix}`
  await next()
})

const api = Router({ prefix: '/api' })
api.extend(router)

app.use(Convert(bodyParser()))
app.use(router.middleware())
app.use(api.middleware())

app.listen(3000, () => {
  console.log('Server started On http://localhost:3000')
})
