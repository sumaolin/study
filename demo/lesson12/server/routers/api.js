const router = require('koa-router')
const userInfoController = require('../controllers/user_info')

const apiR = new router()

apiR
  // .get('/user/getUserInfo', userInfoController.getLoginUserInfo)
  .post('/user/signIn', userInfoController.signIn)
  .post('/user/signUp', userInfoController.signUp)

module.exports = apiR
