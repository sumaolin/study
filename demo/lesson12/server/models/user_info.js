const dbUtils = require('../utils/db_utils')

const user = {
  async creat(model) {
    let res = await dbUtils.insertData('user_info', model)
    return res
  },

  async getExistOne(options) {
    let _sql = `SELECT * from user_info where email="${
      options.email
    }" or name="${options.name}" limit 1`

    let res = await dbUtils.query(_sql)
    if (Array.isArray(res) && res.length > 0) {
      return res[0]
    } else {
      return null
    }
  },

  async getOneByUserNameAndPassword(options) {
    let _sql = `select * from user_info where password="${
      options.password
    }" and name="${options.name} limit 1"`

    const result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      return result[0]
    } else {
      return null
    }
  },

  async getUserInfoByUserName(userName) {
    let result = await dbUtils.select('user_info', [
      'id',
      'email',
      'name',
      'detail_info',
      'create_time',
      'modified_time'
    ])

    if (Array.isArray(result) && result.length > 0) {
      return result[0]
    } else {
      return null
    }
  }
}
module.exports = user
