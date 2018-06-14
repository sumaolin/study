const userService = require('../service/user')
module.exports = {
  login: async (ctx, next) => {
    await ctx.render('user/login', {
      btnName: 'login'
    })
  },
  postsParams: async (ctx, next) => {
    ctx.response.body = 'user Id:' + ctx.params.id
  },
  register: async (ctx, next) => {
    let { name, password } = ctx.request.body
    const resData = await userService.login(name, password)
    ctx.response.body = '<h1>' + resData + '</h1>'
  },
  notFound: async (ctx, next) => {
    ctx.response.body = '<h1>404 page</h1>'
  },
  queryP: async (cxt, next) => {
    console.log(ctx.request.query)
    console.log(ctx.request.querystring)
  }
}
