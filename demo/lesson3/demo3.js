const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const home = new Router()
app.use(bodyParser())

home
  .get('/', ctx => {
    let html = `
  <h1>koa2 request post demo</h1>
  <form method="POST" action="/">
    <p>userName</p>
    <input name="userName" /><br/>
    <p>nickName</p>
    <input name="nickName" /><br/>
    <p>email</p>
    <input name="email" /><br/>
    <button type="submit">submit</button>
  </form>
  `
    ctx.body = html
  })
  .post('/', ctx => {
    let formData = ctx.request.body
    ctx.body = formData
  })
  .all('/*', ctx => {
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
  })

app.use(home.routes()).use(home.allowedMethods())
app.listen(3000, () => {
  console.log('listen start localhost:3000')
})
