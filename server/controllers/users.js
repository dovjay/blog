require('dotenv').config()
const User = require('../models/users')
const isEmailExists = require('../helpers/isEmailExists')
const emailValidation = require('../helpers/emailValidation')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

class UserController {
  static getUser (req, res) {
    User.find()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static signUp (req, res) {
    if (emailValidation(req.body.email)) {
      if (req.body.password.length < 4) {
        res.status(400).json({ message: "Password length can't be less than 4"})
      }
      const buf = crypto.randomBytes(256).toString('hex')
      const hash = crypto.createHmac('sha256', buf)
                         .update(req.body.password)
                         .digest('hex')
      let user = new User({
        name: req.body.name,
        password: hash,
        salt: buf,
        email: req.body.email
      })
  
      isEmailExists(user.email)
        .then(() => {
          user.save()
          .then(data => {
            res.status(201).json({ message: 'New user successfully created!' })
          })
          .catch(err => {
            res.status(500).json(err)
          })
        })
        .catch(err => {
          res.status(400).json(err)
        })
    } else {
      res.status(400).json({ message: 'Please input email correctly!' })
    }
  }

  static signIn (req, res) {
    if (emailValidation(req.body.email)) {
      User.findOne({ email: req.body.email })
        .then(data => {
          let hash = crypto.createHmac('sha256', data.salt)
                           .update(req.body.password)
                           .digest('hex')

          if (data.password == hash) {
            let token = jwt.sign({ id: data._id, name: data.name, email: data.email, role: data.role }, process.env.SECRET)
            res.status(200).json({ message: 'Signin Success!', token, name: data.name })
          } else {
            res.status(400).json({ message: 'Password is wrong!' })
          }
        })
        .catch(err => {
          res.status(500).json(err)
        })
    } else {
      res.status(400).json({ message: 'Please input email correctly!' })
    }
  }
}

module.exports = UserController
