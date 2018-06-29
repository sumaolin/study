const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  if (ctx.url === '/index') {
    ctx.cookies.set('ci', 'hello su', {
      domain: 'localhost',
      path: '/index',
      httpOnly: false,
      overwrite: false,
      expires: new Date('2019-01-01'),
      maxAge: 10 * 3 * 1000
    })
    ctx.body = 'cookies is ok'
  } else {
    ctx.body = 'hello world'
  }
})

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
