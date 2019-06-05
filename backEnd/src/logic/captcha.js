module.exports = class extends think.Logic {
  postAction() {
    let tel = this.post('tel')
    console.log(tel)
    let rule = {
      tel: {
        method: 'post',
        mobile: 'zh-CN'
      }
    }

    let flag = this.validate(rule)
    console.log(flag)
    if (!flag) {
      console.log(this.validateErrors)
      // return false
    }
  }
}
