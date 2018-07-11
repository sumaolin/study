const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const homeR = new Router()

homeR.get('/jsonp', async ctx => {
  const callbackName = ctx.query.cba
  const returnData = {
    time: new Date().getTime(),
    msg: 'this is a jsonp api'
  }

  ctx.type = 'text/javascript'
  ctx.body = `${callbackName}(${JSON.stringify(returnData)})`
})

app.use(homeR.routes()).use(homeR.allowedMethods())

app.listen(3000, () => {
  console.log('server start on 3000')
})
