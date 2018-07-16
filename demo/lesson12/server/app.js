const path = require('path')
const koa = require('koa')
const static = require('koa-static')
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session-minimal')
const mysqlStore = require('koa-mysql-session')
const convert = require('koa-convert')
const logger = require('koa-logger')
// user
const config = require('./../config')
const routers = require('./routers')

const sessionMysqlConfig = {
  user: config.database.USER,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST
}

const app = new koa()

app.use(
  session({
    key: 'USER_SID',
    store: new mysqlStore(sessionMysqlConfig)
  })
)

app.use(convert(logger()))
app.use(bodyParser())
app.use(convert(static(path.join(__dirname, './../static'))))
app.use(
  views(path.join(__dirname, './views'), {
    extension: 'ejs'
  })
)

app.use(routers.routes()).use(routers.allowedMethods())

app.listen(config.port, () => {
  console.log(`server start on localhost:${config.port}`)
})
