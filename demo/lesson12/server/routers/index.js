const router = require('koa-router')
const userInfoController = require('../controllers/user_info')

const apiR = require('./api')

const allRouter = new router()

allRouter.use('/api', apiR.routes(), apiR.allowedMethods())
allRouter.get('/user', async ctx => {
  await ctx.render('index')
})
allRouter.all('/*', async ctx => {
  await ctx.render('index')
  userInfoController.requireLogin(ctx)
})

module.exports = allRouter
