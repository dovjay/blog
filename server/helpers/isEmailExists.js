const User = require('../models/users')

module.exports = (email) => {
  return new Promise((resolve, reject) => {
    User.find({ email: email }, (err, docs) => {
      if (err) throw err
      if (!docs.length) {
        resolve()
      } else {
        reject({ message: 'Email is already exist!' })
      }
    })
  })
}
