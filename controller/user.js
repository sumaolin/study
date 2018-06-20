const userService = require('../service/user')
module.exports = {
  index: async (ctx, next) => {
    console.log(ctx.request.path)
    await ctx.render('user/index', {
      title: 'iKcamp欢迎您'
    })
  },
  login: async (ctx, next) => {
    await ctx.render('user/login', {
      title: '个人登陆也没'
    })
  },
  postsParams: async (ctx, next) => {
    ctx.response.body = 'user Id:' + ctx.params.id
  },

  json: async (ctx, next) => {
    ctx.send({
      status: 'success',
      data: 'hello ikcmap'
    })
  },
  register: async (ctx, next) => {
    let { name, password } = ctx.request.body
    const resData = await userService.login(name, password)
    if (resData.status == '-1') {
      await ctx.render('user/login', resData.data)
    } else {
      ctx.state.title = '个人中心'
      await ctx.render('user/suc', resData.data)
    }
  },
  notFound: async (ctx, next) => {
    ctx.response.body = '<h1>404 page</h1>'
  },
  queryP: async (cxt, next) => {
    console.log(ctx.request.query)
    console.log(ctx.request.querystring)
  }
}
