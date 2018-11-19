const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const app = require('../app')

chai.use(chaiHttp)

describe('Comment Route Success Story', function () {
  let commentId = ''
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZjE2NGU2YTgwZjRiM2I2YmRjY2VhMyIsIm5hbWUiOiJ0ZXMiLCJlbWFpbCI6InRlc0B0ZXMudGVzIiwiaWF0IjoxNTQyNTkyMTE5fQ.8cmuBz3Zkma_qhbFfh9kxiC-9YIyYU7a_33hCAC0-rg'

  it('GET /comment', function (done) {
    chai.request(app)
      .get('/comment')
      .end(function (err, res) {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        expect(err).to.be.null
        done()
      })
  })

  it('POST /comment', function (done) {
    chai.request(app)
      .post('/comment')
      .send({
        content: 'yooo',
        articleId: '5bf1654fa80f4b3b6bdccea4'
      })
      .set('token', token)
      .end(function (err, res) {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        commentId = res.body._id
        expect(err).to.be.null
        done()
      })
  })

  it('DELETE /comment', function (done) {
    chai.request(app)
      .delete('/comment')
      .send({ id: commentId })
      .set('token', token)
      .end(function (err, res) {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(err).to.be.null
        done()
      })
  })
})

describe('Comment Route Error Story', function () {
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZjE2NGU2YTgwZjRiM2I2YmRjY2VhMyIsIm5hbWUiOiJ0ZXMiLCJlbWFpbCI6InRlc0B0ZXMudGVzIiwiaWF0IjoxNTQyNTkyMTE5fQ.8cmuBz3Zkma_qhbFfh9kxiC-9YIyYU7a_33hCAC0-rg'
  it('POST /comment without token', function (done) {
    chai.request(app)
      .post('/comment')
      .send({
        content: 'test',
        articleId: '5bf1654fa80f4b3b6bdccea4'
      })
      .end(function (err, res) {
        expect(res).to.have.status(500)
        expect(res.body).to.be.an('object').empty
        expect(err).to.be.null
        done()
      })
  })

  it('POST /comment without content', function (done) {
    chai.request(app)
      .post('/comment')
      .set('token', token)
      .send({
        content: '',
        articleId: '5bf1654fa80f4b3b6bdccea4'
      })
      .end(function (err, res) {
        console.log(err)
        done()
      })
  })
})