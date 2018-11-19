const route = require('express').Router()
const isLogin = require('../middlewares/isLogin')
const CommentController = require('../controllers/comments')

route.get('/', CommentController.getComment)
route.post('/', isLogin, CommentController.postComment)
route.delete('/', isLogin, CommentController.deleteComment)

module.exports = route
