const validator = require('validator')
const userModel = require('../models/user_info')
const userCode = require('../code/user')

const user = {
  async creat(user) {
    let result = await userModel.creat(user)
    return result
  },

  async getExistOne(formData) {
    let resultData = await userModel.getExistOne({
      email: formData.email,
      name: formData.userName
    })

    return resultData
  },

  async signIn(formData) {
    const result = await userModel.getOneByUserNameAndPassword({
      password: formData.password,
      name: formData.userName
    })

    console.log(result)

    return result
  },

  async getUserInfoByUserName(userName) {
    let result = (await userModel.getUserInfoByUserName(userName)) || {}

    const userInfo = {
      email: result.email,
      userName: result.name,
      detailInfo: result.detail_info,
      createTime: result.create_time
    }
    return userInfo
  },

  async validatorSignUp(userInfo) {
    const result = {
      success: false,
      message: ''
    }

    if (/[a-z0-9\_\-]{6,16}/.test(userInfo.userName) === false) {
      result.message = userCode.ERROR_USER_NAME
      return result
    }
    if (!validator.isEmail(userInfo.email)) {
      result.message = userCode.ERROR_EMAIL
      return result
    }
    if (!/[\w+]{6,16}/.test(userInfo.password)) {
      result.message = userCode.ERROR_PASSWORD
      return result
    }
    if (userInfo.password !== userInfo.confirmPassword) {
      result.message = userCode.ERROR_PASSWORD_CONFORM
      return result
    }

    result.success = true

    return result
  }
}

module.exports = user
