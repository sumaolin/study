const Koa = require('koa')
const staticFiles = require('koa-static')
const path = require('path')

const App = new Koa()

App.use(staticFiles(path.join(__dirname, './static')))

App.listen(3000, () => {
  console.log('localhost:3000 is start')
})
