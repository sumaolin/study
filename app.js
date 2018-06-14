const Koa = require('koa')
const path = require('path')
const nunjucks = require('koa-nunjucks-2')
const bodyParser = require('koa-bodyparser')
const staticFile = require('koa-static')
const app = new Koa()
const router = require('./router')

console.log(path.join(__dirname, 'views'))
app.use(staticFile(path.resolve(__dirname, './public')))
app.use(
  nunjucks({
    ext: 'html',
    path: path.join(__dirname, 'views'),
    nunjucksConfig: {
      trimBlocks: true
    }
  })
)

app.use(bodyParser())
router(app)

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
