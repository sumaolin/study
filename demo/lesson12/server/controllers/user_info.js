const userService = require('../services/user_info')
const userCode = require('../code/user')

module.exports = {
  async signIn(ctx) {
    const formData = ctx.request.body
    const result = {
      success: false,
      message: '',
      data: null,
      code: ''
    }

    console.log(formData)

    const userResult = await userService.signIn(formData)
    if (userResult) {
      if (userResult.name === formData.userName) {
        result.success = true
      } else {
        result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
        result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR'
      }
    } else {
      result.message = userCode.FAIL_USER_NO_EXIST
      result.code = 'FAIL_USER_NO_EXIST'
    }

    // session
    if (formData.source === 'form' && result.success === true) {
      let session = ctx.session
      session.isLogin = true
      session.userName = userResult.name
      session.userId = userResult.id
      ctx.redirect('/work')
    } else {
      ctx.body = result
    }
  },

  async signUp(ctx) {
    const formData = ctx.request.body
    let result = {
      success: false,
      message: '',
      data: null
    }

    console.log(formData)

    const validatorResult = await userService.validatorSignUp(formData)
    console.log(validatorResult)

    if (validatorResult.success === false) {
      result = validatorResult
      ctx.body = result
      return
    }

    const existOne = await userService.getExistOne(formData)
    if (existOne) {
      if (existOne.name === formData.userName) {
        result.message = userCode.FAIL_USER_NAME_IS_EXIST
        ctx.body = result
        return
      }

      if (existOne.email === formData.email) {
        result.message = userCode.FAIL_EMAIL_IS_EXIST
        ctx.body = result
        return
      }
    }

    const creatUserResult = await userService.creat({
      email: formData.email,
      password: formData.password,
      name: formData.userName,
      create_time: new Date().getTime(),
      level: 1
    })

    if (creatUserResult && creatUserResult.insertId * 1 > 0) {
      result.success = true
    } else {
      result.message = userCode.ERROR_SYS
    }
    ctx.body = result
  }
}
