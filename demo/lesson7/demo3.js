const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const static = require('koa-static')
const path = require('path')
const upload = require('./utils/upload3')

const app = new Koa()
const homeR = new Router()

app.use(static(path.join(__dirname, './static')))
app.use(
  views(path.join(__dirname, './views'), {
    extension: 'ejs'
  })
)

homeR
  .get('/', async ctx => {
    await ctx.render('demo3')
  })
  .post('/upload', async (ctx, next) => {
    let result = { success: false }
    const uploadPath = path.join(__dirname, './static/images')

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
