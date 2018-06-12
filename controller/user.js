module.exports = {
  login: async (ctx, next) => {
    ctx.response.body = `
    <form action="/user/register" method="post">
      <input name="name" type="text" placeholder="请输入用户名：ikcamp"/>
      <br/>
      <input name="password" type="text" placeholder="请输入密码：123456"/>
      <br/>
      <button>GoGoGo</button>
    </form>
    `
  },
  postsParams: async (ctx, next) => {
    ctx.response.body = 'user Id:' + ctx.params.id
  },
  register: async (ctx, next) => {
    let { name, password } = ctx.request.body
    if (name == 'sumaolin' && password == '123456') {
      ctx.response.body = `hello ${name}`
    } else {
      ctx.response.body = '<h1>password error</h1>'
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
