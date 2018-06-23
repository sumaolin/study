const log4js = require('log4js')

log4js.configure({
  appenders: { c2: { type: 'file', filename: 'c2.log' } },
  categories: {
    default: {
      appenders: ['c2'],
      level: 'info'
    }
  }
})

module.exports = option => {
  return async (ctx, next) => {
    const logger = log4js.getLogger('c2')
    const startDate = new Date()
    await next()
    const endDate = new Date()
    const resTime = endDate - startDate
    logger.info(`相应时间为${resTime / 1000}s`)
  }
}
