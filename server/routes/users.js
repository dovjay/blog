var express = require('express');
var router = express.Router();
const UserController = require('../controllers/users')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/signup', UserController.signUp)
router.post('/signin', UserController.signIn)

module.exports = router;
