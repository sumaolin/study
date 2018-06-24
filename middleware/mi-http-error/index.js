const path = require('path')
const nunjucks = require('nunjucks')
module.exports = (opts = {}) => {
  return async (ctx, next) => {
    const folder = opts.errorPageFolder
    const templatePath = path.resolve(__dirname, './error.html')
    let fileName = 'other'
    try {
      await next()
      // 对于 默认为找到路由请求的处理
      if (ctx.response.status === 404 && !ctx.response.body) {
        ctx.throw(404)
      }
    } catch (e) {
      let status = parseInt(e.status)
      const message = e.message

      if (status >= 400) {
        switch (status) {
          case 400:
          case 404:
          case 500:
            fileName = status

          default:
            fileName = 'other'
        }
      }
      const filePath = folder
        ? path.join(folder, `${fileName}.html`)
        : templatePath

      // 渲染错误提升 视图
      try {
        nunjucks.configure(folder ? folder : __dirname)
        const data = await nunjucks.render(filePath, {
          env: 'dev',
          status: e.status,
          message: e.message,
          stack: e.stack
        })
        ctx.status = status
        ctx.body = data
      } catch (e) {
        ctx.throw(500, `错误页渲染失败： ${e.message}`)
      }
    }
  }
}
