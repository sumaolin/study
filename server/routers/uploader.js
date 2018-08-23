const Router = require('koa-router')

const webuploader = require('../middleware/webuploader')
const uploaderRouter = new Router()

uploaderRouter
  .get('/', async (ctx, next) => {
    await ctx.render('uploader')
  })
  .post('/file', async (ctx, next) => {
    const uploadResult = await webuploader(ctx, next)
    ctx.send(uploadResult)
  })

module.exports = uploaderRouter
