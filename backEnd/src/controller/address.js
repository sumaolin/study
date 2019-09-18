const Base = require('./base.js')

module.exports = class extends Base {
  indexAction() {
    return this.display()
  }

  addAction() {}
  async submitAction() {
    const addressList = await this.model('address')
      .where({ user_id: think.userId })
      .select()
    console.log('address controller submit action')
    this.model(addressList)
  }
}
