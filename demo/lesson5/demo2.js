const Koa = require('koa')
const Router = require('koa-router')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')

const app = new Koa()

const cookie = {
  maxAge: 10 * 60 * 1000,
  expirse: new Date('2019-06-01'),
  path: '/',
  domain: 'localhost',
  httpOnly: 'false',
  overwrite: 'false',
  secure: '',
  sameSite: '',
  signed: ''
}

const store = new MysqlSession({
  user: 'root',
  password: '618819',
  host: '127.0.0.1',
  database: 'session_demo'
})

app.use(
  session({
    key: 'SESSION_ID',
    cookie: cookie,
    store: store
  })
)

const homeR = new Router()

homeR
  .get('/', async ctx => {
    ctx.session.count = ctx.session.count + 1
    ctx.body = ctx.session
  })
  .get('/set', async ctx => {
    ctx.session = {
      user_id: Math.random()
        .toString(36)
        .substr(3),
      count: 0
    }

    ctx.body = ctx.session
  })

app.use(homeR.routes()).use(homeR.allowedMethods())

app.listen(3000, () => {
  console.log('service start localhost:3000')
})
