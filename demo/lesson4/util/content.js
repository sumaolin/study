const path = require('path')
const fs = require('fs')

const dir = require('./dir')
const file = require('./file')

async function getContent(ctx, staticPath) {
  const reqPath = path.join(staticPath, ctx.url)

  const exist = fs.existsSync(reqPath)
  console.log(exist)

  let content = ''
  if (!exist) {
    content = '404 not found!'
  } else {
    let stat = fs.statSync(reqPath)
    if (stat.isDirectory()) {
      content = dir(ctx.url, reqPath)
    } else {
      content = await file(reqPath)
    }
  }
  return content
}

module.exports = getContent
