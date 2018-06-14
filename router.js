const Router = require('koa-router')
const userController = require('./controller/user')
const userRouter = new Router({
  prefix: '/user'
})
module.exports = app => {
  userRouter.get('/', userController.index)
  userRouter.get('/login', userController.login)

  userRouter.get('/:id/posts', userController.postsParams)

  userRouter.post('/register', userController.register)

  userRouter.get('/404', userController.notFound)

  app.use(userRouter.routes()).use(userRouter.allowedMethods())
}
