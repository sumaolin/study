const path = require('path')
const Koa = require('koa')
const views = require('koa-view')
const Static = require('koa-static')
// const bodyParse = require('koa-bodyparser')
// customer
const middlewares = require('./middleware')
const routers = require('./routers')
const app = new Koa()

middlewares(app)
app.use(Static(path.resolve(__dirname, './public')))

app.use(
  views(path.resolve(__dirname, './views'), {
    extension: 'ejs'
  })
)

// app.use(bodyParse())

app.use(routers.routes()).use(routers.allowedMethods())

app.listen(3000, () => {
  console.log('server start on port: 3000')
})
