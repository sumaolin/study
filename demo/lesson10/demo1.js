const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()

const testR = new Router()

let resultData = {
  success: true,
  data: null
}

testR
  .get('/getString', async ctx => {
    resultData.data = 'hello world!'
    ctx.body = resultData
  })
  .get('/getNumber', async ctx => {
    resultData.data = 123456
    ctx.body = resultData
  })
  .post('/postData', async ctx => {
    resultData.data = 'postData ok!'
    ctx.body = resultData
  })

app.use(testR.routes()).use(testR.allowedMethods())

app.listen(3000, () => {
  console.log('server start on  localhost:3000')
})
module.exports = app
