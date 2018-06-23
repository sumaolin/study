const path = require('path')
const nunjucks = require('koa-nunjucks-2')
const bodyParser = require('koa-bodyparser')
const staticFile = require('koa-static')
const miSend = require('./mi-send')
const miLog = require('./mi-log')
console.log(path.join(__dirname, '../views'))
module.exports = app => {
  app.use(miLog())
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
}
