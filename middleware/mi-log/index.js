const logger = require('./logger')
module.exports = opt => {
  const loggerMiddleWare = logger(opt)

  return (cxt, next) => {
    return loggerMiddleWare(cxt, next).catch(e => {
      if (ctx.status < 500) {
        ctx.status = 500
      }
      ctx.log.error(e.stack)
      ctx.state.logged = true
      ctx.throw(e)
    })
  }
  return logger(opt)
}
