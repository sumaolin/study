import Koa from 'koa'
import Router from 'koa-better-router'
import OtherParser from 'koa-better-body'
import bodyParser from 'koa-bodyparser'
import Convert from 'koa-convert'

const router = Router().loadMethods()
const app = new Koa()

router.get('/hello', async (ctx, next) => {
  ctx.body = `Hello world! prefix: ${ctx.route.prefix}`
  await next()
})

router.post('/upload/:id', async (ctx, next) => {
  console.log(ctx.request.files)
  console.log(ctx.request.fields)
  ctx.body = JSON.stringify(
    {
      files: ctx.request.files,
      fields: ctx.request.fields,
      body: ctx.request.body || null
    },
    null,
    2
  )
  await next()
})

router.get('/foobar', async (ctx, next) => {
  ctx.body = `Foo Bar Baz! ${ctx.route.prefix}`
  await next()
})

const api = Router({ prefix: '/api' })
api.extend(router)

app.use(Convert(bodyParser()))
app.use(Convert(OtherParser()))
app.use(router.middleware())
app.use(api.middleware())

app.listen(3000, () => {
  console.log('Server started On http://localhost:3000')
})
