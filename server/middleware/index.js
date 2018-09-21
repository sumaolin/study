const path = require('path')
const views = require('koa-view')
const Static = require('koa-static')
// const bodyParse = require('koa-bodyparser')
const miSend = require('./mi-send')

module.exports = app => {
  app.use(Static(path.resolve(__dirname, './../public')))
  // app.use(bodyParse())

  app.use(
    views(path.resolve(__dirname, './../views'), {
      extension: 'ejs'
    })
  )
  app.use(miSend())
}
