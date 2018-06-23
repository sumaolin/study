const log4js = require('log4js')
const access = require('./access')

const methods = ['track', 'debug', 'info', 'warn', 'error', 'fatal', 'mark']

const commonInfo = {
  logDir: 'logs',
  appLogLevel: 'info',
  env: 'dev',
  projectName: 'koa2-tutorial',
  serverIp: '0.0.0.0'
}

module.exports = option => {
  return async (ctx, next) => {
    const opt = Object.assign({}, commonInfo, option || {})
    const { logDir, appLogLevel, env, projectName, serverIp } = opt
    const appInfo = { projectName, serverIp }
    const contextLogger = {}
    const appenders = {}

    appenders.c2 = {
      type: `dateFile`,
      filename: `${logDir}/task`,
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    }

    if (env == 'dev' || env == 'local') {
      appenders.out = {
        type: 'console'
      }
    }

    const config = {
      appenders,
      categories: {
        default: {
          appenders: Object.keys(appenders),
          level: 'info'
        }
      }
    }

    log4js.configure(config)
    const logger = log4js.getLogger('c2')

    methods.forEach((method, i) => {
      contextLogger[method] = message => {
        logger[method](message)
      }
    })

    ctx.log = contextLogger

    const startDate = new Date()
    await next()
    const endDate = new Date()
    const resTime = endDate - startDate
    logger.info(
      access(
        ctx,
        {
          responseTime: `相应时间为${resTime / 1000}s`
        },
        appInfo
      )
    )
  }
}
