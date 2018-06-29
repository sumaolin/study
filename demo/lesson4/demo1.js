const Koa = require('koa')
const path = require('path')
const getContent = require('./util/content')
const Mine = require('./util/mines')

const app = new Koa()

const staticPath = './static'

app.use(async (ctx, next) => {
  let fullStaticPath = path.join(__dirname, staticPath)

  let _content = await getContent(ctx, fullStaticPath)
  console.log(_content)

  let _mine = Mine.parseMine(ctx.url)

  if (_mine) {
    ctx.type = _mine
  }

  if (_mine && _mine.indexOf('image/') >= 0) {
    // ctx.res = node response, 图片通过response 的二进制格式直接输出
    ctx.res.writeHead(200)
    ctx.res.write(_content, 'binary')
    ctx.res.end()
  } else {
    ctx.body = _content
  }
})

app.listen(3000, () => {
  console.log('listen start localhost:3000')
})
