const Koa = require('koa')
const logger = require('./logger-async')
const app = new Koa()

app.use(logger())

app.use(ctx => {
  ctx.body = 'hello world!'
})

app.listen(3000, function() {
  console.log('localhost:3000 start')
})
