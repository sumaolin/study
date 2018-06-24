const path = require('path')
const ip = require('ip')
const nunjucks = require('koa-nunjucks-2')
const bodyParser = require('koa-bodyparser')
const staticFile = require('koa-static')
const miSend = require('./mi-send')
const miLog = require('./mi-log')
const httpError = require('./mi-http-error')
// console.log(path.join(__dirname, '../views'))
module.exports = app => {
  app.use(
    httpError({
      errorPageFolder: path.resolve(__dirname, '../errorPage')
    })
  )
  app.use(
    miLog({
      env: 'dev',
      serverIp: ip.address(),
      projectName: 'sumaolin',
      appLogLevel: 'info',
      logDir: 'logs'
    })
  )
  app.use(staticFile(path.resolve(__dirname, '../public')))
  app.use(miSend())
  app.use(
    nunjucks({
      ext: 'html',
      path: path.join(__dirname, '../views'),
      nunjucksConfig: {
        trimBlocks: true
      }
    })
  )

  app.use(bodyParser())

  app.on('error', (err, ctx) => {
    if (ctx && ctx.headerSent && ctx.status < 500) {
      ctx.stauts = 500
    }
    if (ctx && ctx.log && ctx.log.error) {
      if (!ctx.state.logged) {
        ctx.log.error(err.stack)
      }
    }
  })
}
