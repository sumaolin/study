const router = require('koa-router')

const apiR = require('./api')

const allRouter = new router()

allRouter.use('/api', apiR.routes(), apiR.allowedMethods())

module.exports = allRouter
