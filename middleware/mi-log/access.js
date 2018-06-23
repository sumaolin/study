module.exports = (ctx, message, baseInfo) => {
  const { method, url, host, headers } = ctx.request

  const client = {
    method,
    url,
    host,
    message,
    referer: headers['referer'],
    userAgent: headers['user-agent']
  }

  return JSON.stringify(Object.assign(baseInfo, client))
}
