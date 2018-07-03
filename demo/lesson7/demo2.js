const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const path = require('path')
const upload = require('./utils/upload')

const app = new Koa()
const homeR = new Router()

app.use(
  views(path.join(__dirname, './views'), {
    extension: 'ejs'
  })
)

homeR
  .get('/', async ctx => {
    await ctx.render('upload')
  })
  .post('/upload', async (ctx, next) => {
    let result = { success: false }
    const uploadPath = path.join(__dirname, './upload2')

    result = await upload.uploadFile(ctx, {
      fileType: 'album',
      filePath: uploadPath
    })
    ctx.body = result
  })

app.use(homeR.routes()).use(homeR.allowedMethods())

app.listen(3000, () => {
  console.log('server is started: localhost:3000')
})
