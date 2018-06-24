const Router = require('koa-router')
const userRouter = new Router({
  prefix: '/user'
})
module.exports = app => {
  userRouter.get('/', app.controller.user.index)
  userRouter.get('/login', app.controller.user.login)
  userRouter.get('/json', app.controller.user.json)

  userRouter.get('/:id/posts', app.controller.user.postsParams)

  userRouter.post('/register', app.controller.user.register)

  userRouter.get('/404', app.controller.user.notFound)

  app.use(userRouter.routes()).use(userRouter.allowedMethods())
}
