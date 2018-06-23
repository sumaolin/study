const log4js = require('log4js')

log4js.configure({
  appenders: { c2: { type: 'file', filename: 'c2.log' } },
  categories: { default: { appenders: ['c2'], level: 'error' } }
})
const logger = log4js.getLogger('cheese')
logger.trace('Entering cheese testing')
logger.debug('Got cheese.')
logger.info('Cheese is Gouda.')
logger.warn('Cheese is quite smelly.')
logger.error('Cheese is too ripe!')
logger.fatal('Cheese was breeding ground for listeria.')
