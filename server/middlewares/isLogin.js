require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/users')

module.exports = function (req, res, next) {
  req.decoded = jwt.verify(req.headers.token, process.env.SECRET)
  User.findById(req.decoded.id)
    .then(data => {
      if (typeof data._id == 'undefined') res.status(400).json({ message: 'User not found!!' }) 
      else next()
    })
    .catch(err => {
      res.status(400).json({ message: 'User not found!!' })
    })
}