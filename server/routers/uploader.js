const Router = require('koa-router')

const webuploader = require('../middleware/webuploader')
const uploaderRouter = new Router()

uploaderRouter
  .get('/', async (ctx, next) => {
    await ctx.render('uploader')
  })
  .post('/file', async (ctx, next) => {
    webuploader(ctx, next)
  })

module.exports = uploaderRouter
