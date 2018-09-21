const Koa = require('koa')
// customer
const middlewares = require('./middleware')
const routers = require('./routers')
const app = new Koa()

middlewares(app)

app.use(routers.routes()).use(routers.allowedMethods())

app.listen(3000, () => {
  console.log('server start on port: 3000')
})
