const Koa = require('koa')
const fs = require('fs')
const Router = require('koa-router')

const app = new Koa()

let home = new Router()
home.get('/', async ctx => {
  let html = 'index home'
  ctx.body = html
})

let page = new Router()
page
  .get('/page', async ctx => {
    ctx.body = 'page'
  })
  .get('/user', ctx => {
    ctx.body = 'user'
  })

let route = new Router()
route.use('/', home.routes(), home.allowedMethods())
route.use('/page', page.routes(), page.allowedMethods())

app.use(route.routes()).use(route.allowedMethods())

app.listen('3000', () => {
  console.log('start localhost:3000')
})
