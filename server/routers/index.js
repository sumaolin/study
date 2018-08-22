const Router = require('koa-router')

const uploaderR = require('./uploader')

const allRouter = new Router()

allRouter.use('/upload', uploaderR.routes(), uploaderR.allowedMethods())
allRouter.all('*', ctx => {
  ctx.body = 'default index'
})

module.exports = allRouter
