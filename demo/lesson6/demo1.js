const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const path = require('path')

const app = new Koa()
const homeR = new Router()

app.use(
  views(path.join(__dirname, './views'), {
    extension: 'ejs'
  })
)
homeR.get('/home', async ctx => {
  console.log(ctx.url)

  await ctx.render('index', {
    title: 'hello World'
  })
})

app.use(homeR.routes()).use(homeR.allowedMethods())

app.listen(3000, () => {
  console.log('server start: localhost:3000')
})
