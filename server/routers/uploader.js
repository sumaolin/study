const Router = require('koa-router')

const uploaderRouter = new Router()

uploaderRouter.get('/', async (ctx, next) => {
  await ctx.render('uploader')
})

module.exports = uploaderRouter
