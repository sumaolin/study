module.exports = class extends think.Logic {
  indexAction() {}
  addAction() {
    let {
      name,
      province,
      city,
      district,
      address,
      zipcode,
      tel,
      vcode,
      gender
    } = this.post()
    console.log(
      name,
      province,
      city,
      district,
      address,
      zipcode,
      tel,
      vcode,
      gender
    )
  }

  async submitAction() {
    console.log('address logic submit action')

    let rules = {
      name: {
        required: true
      },
      province: {
        required: true,
        int: true
      },
      city: {
        required: true,
        int: true
      },
      district: {
        int: true
      },
      address: {
        required: true
      },
      zipcode: {
        required: true
      },
      tel: {
        mobile: 'zh-CN'
      },
      vcode: {
        required: true
      }
    }
    let vcode = this.post('vcode')
    console.log('vcode: ' + vcode)

    let flag = this.validate(rules)
    var captcha = await this.session('telCaptcha')
    console.log('captcha: ' + captcha)

    if (captcha !== vcode) {
      this.fail('验证码错误')
      return false
    }

    if (!flag) {
      this.fail('用户输入校验出错', this.validateErrors)
      return false
    }
  }
}
