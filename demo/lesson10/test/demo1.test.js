const supertest = require('supertest')
const mocha = require('mocha')
const chai = require('chai')
const app = require('../demo1')
const expect = chai.expect

const request = supertest(app.listen())

describe('app get请求', () => {
  it('/getString', done => {
    request
      .get('/getString')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        expect(res.body.success).to.be.an('boolean')
        expect(res.body.data).to.be.an('string')
        done()
      })
  })

  it('/getNumber', done => {
    request
      .get('/getNumber')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        expect(res.body.success).to.be.an('boolean')
        expect(res.body.data).to.be.an('number')
        done()
      })
  })

  it('/postData', done => {
    request
      .post('/postData')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        expect(res.body.success).to.be.an('boolean')
        expect(res.body.data).to.be.an('string')
        done()
      })
  })
})
