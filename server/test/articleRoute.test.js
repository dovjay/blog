const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const axios = require('axios')

  const app = require('../app')

// User test test test 

chai.use(chaiHttp)

// Success Story
describe('Article Routes Test Success Story', function () {
  // to store the article id
  let articleId = ''
  
  it('GET /article', function (done) {
    chai.request(app)
      .get('/article')
      .end(function (err, res) {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        expect(err).to.be.null
        done()
      })
  })

  it('GET /article/me', function (done) {
    chai.request(app)
      .get('/article/me')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZjE2NGU2YTgwZjRiM2I2YmRjY2VhMyIsIm5hbWUiOiJ0ZXMiLCJlbWFpbCI6InRlc0B0ZXMudGVzIiwiaWF0IjoxNTQyNTkyMTE5fQ.8cmuBz3Zkma_qhbFfh9kxiC-9YIyYU7a_33hCAC0-rg')
      .end(function (err, res) {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        expect(err).to.be.null
        done()
      })
  })

  it('POST /article', function (done) {
    chai.request(app)
      .post('/article')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZjE2NGU2YTgwZjRiM2I2YmRjY2VhMyIsIm5hbWUiOiJ0ZXMiLCJlbWFpbCI6InRlc0B0ZXMudGVzIiwiaWF0IjoxNTQyNTkyMTE5fQ.8cmuBz3Zkma_qhbFfh9kxiC-9YIyYU7a_33hCAC0-rg')
      .send({
        title: 'Let\'s counting!',
        content: 'blablabla'
      })
      .end(function (err, res) {
        expect(res).to.have.status(201)
        expect(res.body).to.be.an('object')
        articleId = res.body._id
        expect(err).to.be.null
        done()
      })
  })

  it('GET /article/:id', function (done) {
    chai.request(app)
      .get(`/article/${articleId}`)
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZjE2NGU2YTgwZjRiM2I2YmRjY2VhMyIsIm5hbWUiOiJ0ZXMiLCJlbWFpbCI6InRlc0B0ZXMudGVzIiwiaWF0IjoxNTQyNTkyMTE5fQ.8cmuBz3Zkma_qhbFfh9kxiC-9YIyYU7a_33hCAC0-rg')
      .end(function (err, res) {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(err).to.be.null
        done()
      })
  })
  
  it('PUT /article', function (done) {
    chai.request(app)
      .put(`/article`)
      .send({
        title: 'Ohayou!',
        content: 'Yo domo!',
        id: articleId
      })
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZjE2NGU2YTgwZjRiM2I2YmRjY2VhMyIsIm5hbWUiOiJ0ZXMiLCJlbWFpbCI6InRlc0B0ZXMudGVzIiwiaWF0IjoxNTQyNTkyMTE5fQ.8cmuBz3Zkma_qhbFfh9kxiC-9YIyYU7a_33hCAC0-rg')
      .end(function (err, res) {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(err).to.be.null
        done()
      })
  })

  it('DELETE /article', function (done) {
    chai.request(app)
      .delete(`/article`)
      .send({
        articleId
      })
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZjE2NGU2YTgwZjRiM2I2YmRjY2VhMyIsIm5hbWUiOiJ0ZXMiLCJlbWFpbCI6InRlc0B0ZXMudGVzIiwiaWF0IjoxNTQyNTkyMTE5fQ.8cmuBz3Zkma_qhbFfh9kxiC-9YIyYU7a_33hCAC0-rg')
      .end(function (err, res) {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(err).to.be.null
        done()
      })
  })

})

// Error Story
describe('Article Routes Error Story', function () {
  let articleId = ''
  before(function () {
    axios({
      url: 'http://localhost:3000/article',
      method: 'post',
      data: {
        title: 'ohayou!',
        content: 'parahparah'
      },
      headers: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZjE2NGU2YTgwZjRiM2I2YmRjY2VhMyIsIm5hbWUiOiJ0ZXMiLCJlbWFpbCI6InRlc0B0ZXMudGVzIiwiaWF0IjoxNTQyNTkyMTE5fQ.8cmuBz3Zkma_qhbFfh9kxiC-9YIyYU7a_33hCAC0-rg'
      }
    })
      .then(response => {
        articleId = response.body._id
      })
      .catch(err => {
        console.log(err)
      })
  })

  it('GET /article/me without token', function (done) {
    chai.request(app)
      .get('/article/me')
      .end(function (req, res) {
        expect(res.body).to.be.an('object').empty
        done()
      })
  })
})