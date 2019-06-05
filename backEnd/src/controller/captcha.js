const BaseRest = require('./rest.js')

module.exports = class extends BaseRest {
  async postAction() {
    console.log('captcha post action')
    let tel = this.post('tel')
    let captcha = tel.substring(7)
    console.log(captcha)

    await this.session('telCaptcha', captcha)
    return this.success({ captcha: captcha })
  }
}
