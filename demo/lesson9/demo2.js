const Koa = require('koa')
const Router = require('koa-router')
const jsonp = require('koa-jsonp')

const app = new Koa()
const homeR = new Router()
app.use(jsonp())
homeR.get('/jsonp', async ctx => {
  const returnData = {
    time: new Date().getTime(),
    msg: 'ok koa-jsonp'
  }
  ctx.body = returnData
})

app.use(homeR.routes()).use(homeR.allowedMethods())

app.listen(3000, () => {
  console.log('server on 3000')
})
