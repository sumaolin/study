const router = require('koa-router')

const apiR = require('./api')

const allRouter = new router()

allRouter.use('/api', apiR.routes(), apiR.allowedMethods())
allRouter.get('/*', async (ctx, next) => {
  await ctx.render('index')
})

module.exports = allRouter
