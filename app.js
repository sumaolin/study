const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  await next()
  ctx.response.type = 'text/html'
  // ctx.response.body = '<h1>Hello World</h1>'
})

app.use(async (ctx, next) => {
  if (ctx.request.path == '/') {
    ctx.response.body = '<h1>index page</h1>'
  } else {
    await next()
  }
})

app.use(async (ctx, next) => {
  if (ctx.request.path == '/') {
    ctx.response.body = '<h1>index page</h1>'
  } else {
    await next()
  }
})

app.use(async (ctx, next) => {
  if (ctx.request.path == '/home') {
    ctx.response.body = '<h1>home page</h1>'
  } else {
    await next()
  }
})

app.use(async (ctx, next) => {
  if (ctx.request.path == '/404') {
    ctx.response.body = '<h1>404 page</h1>'
  } else {
    await next()
  }
})

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
