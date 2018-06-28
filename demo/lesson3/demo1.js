const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  const { url } = ctx
  const { query, querystring } = ctx.request
  const { query: ctx_query, querystring: ctx_querystring } = ctx
  ctx.body = {
    url,
    query,
    querystring,
    ctx_query,
    ctx_querystring
  }
})

app.listen(3000, () => {
  console.log('start listen localhost:3000')
})
