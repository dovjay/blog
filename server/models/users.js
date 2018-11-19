require('dotenv').config()
const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect(process.env.MLAB)

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please insert your name"]
  },
  email: {
    type: String,
    required: [true, "Please input your email"]
  },
  password: {
    type: String,
    required: [true, "Please input your password"]
  },
  salt: {
    type: String,
    required: [true, "Please insert the salt"]
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
