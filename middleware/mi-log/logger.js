const log4js = require('log4js')

log4js.configure({
  appenders: {
    c2: {
      type: `dateFile`,
      filename: `logs/task`,
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: {
      appenders: ['c2'],
      level: 'info'
    }
  }
})

const methods = ['track', 'debug', 'info', 'warn', 'error', 'fatal', 'mark']

module.exports = option => {
  return async (ctx, next) => {
    const contextLogger = {}
    const logger = log4js.getLogger('c2')
    const startDate = new Date()

    methods.forEach((method, i) => {
      contextLogger[method] = message => {
        logger[method](message)
      }
    })

    ctx.log = contextLogger

    await next()
    const endDate = new Date()
    const resTime = endDate - startDate
    logger.info(`相应时间为${resTime / 1000}s`)
  }
}
