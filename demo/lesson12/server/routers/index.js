const router = require('koa-router')
const userInfoController = require('../controllers/user_info')

const apiR = require('./api')

const allRouter = new router()

allRouter.use('/api', apiR.routes(), apiR.allowedMethods())
allRouter.all('/*', async ctx => {
  console.log('allrouter * url: ' + ctx.url)
  if (ctx.url === '/user') {
  } else {
    userInfoController.requireLogin(ctx)
  }
  await ctx.render('index')
})

module.exports = allRouter
