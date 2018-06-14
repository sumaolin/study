module.exports = {
  login: async (username, password) => {
    if (username == 'sumaolin' && password == '123456') {
      return {
        status: 0,
        data: {
          title: '个人中心',
          content: '欢迎进入个人中心'
        }
      }
    } else {
      return {
        status: -1,
        data: {
          title: '登陆失败',
          content: '请输入正确的帐号信息！'
        }
      }
    }
  }
}
