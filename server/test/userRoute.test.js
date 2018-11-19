const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const User = require('../models/users')

const app = require('../app')

chai.use(chaiHttp)

// Success test case
describe('User Routes Test Success Story', function () {

  let userSignIn, userSignUp
  before(function () {
    userSignIn = {
      email: 'name@mail.co',
      password: 'password'
    }
    userSignUp = {
      name: 'name',
      email: 'name@mail.co',
      password: 'password'
    }
  })

  it('POST /user/signup (Successfully signup)', function (done) {
    chai.request(app)
      .post('/user/signup')
      .send(userSignUp)
      .end(function (err, res) {
        expect(res).to.have.status(201)
        console.log(res.body)
        expect(res.body.message).to.equal('New user successfully created!')
        expect(err).to.be.null
        done()
      })
  })

  it('POST /user/signin (Successfully signin)', function (done) {
    chai.request(app)
      .post('/user/signin')
      .send(userSignIn)
      .end(function (err, res) {
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('token')
        expect(res.body.message).to.equal('Signin Success!')
        expect(err).to.be.null
        done()
      })
  })
})

// Error test case
describe('User Routes Test Error Story', function () {
  let userSignIn, userSignUp
  before(function () {
    userSignIn = {
      email: 'name@mail.co',
      password: 'password'
    }
    userSignUp = {
      name: 'name',
      email: 'name@mail.co',
      password: 'password'
    }
  })

  after(function () {
    User.findOneAndDelete({name: 'name'})
  })

  // User Sign Up
  it('should be error when email exists (user signup)', function (done) {
    chai.request(app)
      .post('/user/signup')
      .send(userSignUp)
      .end(function (err, res) {
        expect(res).to.have.status(400)
        expect(res.body.message).to.equal('Email is already exist!')
        done()
      })
  })

  it('should be error when email input incorrectly (user signup)', function (done) {
    chai.request(app)
      .post('/user/signup')
      .send({
        name: userSignUp.name,
        email: 'name@mail',
        password: userSignUp.password
      })
      .end(function (err, res) {
        expect(res).to.have.status(400)
        expect(res.body.message).to.equal('Please input email correctly!')
        done()
      })
  })

  it('should be error when password is length less than 4 (user signup)', function (done) {
    chai.request(app)
      .post('/user/signup')
      .send({
        name: userSignUp.name,
        email: 'namename@mail.co',
        password: '123'
      })
      .end(function (err, res) {
        expect(res).to.have.status(400)
        expect(res.body.message).to.equal('Password length can\'t be less than 4')
        done()
      })
  })

  // User Sign In
  it('should be error when email input incorrectly (user signin)', function (done) {
    chai.request(app)
      .post('/user/signin')
      .send({
        email: 'name@mail',
        password: userSignIn.password
      })
      .end(function (err, res) {
        expect(res).to.have.status(400)
        expect(res.body.message).to.equal('Please input email correctly!')
        done()
      })
  })

  it('should be error when the password is wrong (user signin)', function (done) {
    chai.request(app)
      .post('/user/signin')
      .send({
        email: userSignIn.email,
        password: '1234'
      })
      .end(function (err, res) {
        expect(res).to.have.status(400)
        expect(res.body.message).to.equal('Password is wrong!')
        done()
      })
  })

  after(function() {
    User.deleteMany({name: 'name'})
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  })
})