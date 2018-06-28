const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const home = new Router()

function parseFormData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let reqData = ''
      ctx.req.addListener('data', data => {
        reqData += data
      })
      ctx.req.addListener('end', () => {
        console.log(reqData)
        const parsedData = queryParseData(reqData)
        console.log(parsedData)
        resolve(parsedData)
      })
    } catch (e) {
      reject(e)
    }
  })
}

function queryParseData(data) {
  let queryObj = {}

  let arrQuery = data.split('&')
  console.log(arrQuery)
  for (let [index, item] of arrQuery.entries()) {
    let arrItem = item.split('=')
    queryObj[arrItem[0]] = decodeURIComponent(arrItem[1])
  }
  return queryObj
}

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
  .post('/', async ctx => {
    let formData = await parseFormData(ctx)
    ctx.body = formData
  })
  .all('/*', ctx => {
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
  })

app.use(home.routes()).use(home.allowedMethods())
app.listen(3000, () => {
  console.log('listen start localhost:3000')
})
