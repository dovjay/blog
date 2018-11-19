const route = require('express').Router()
const ArticleController = require('../controllers/articles')
const isLogin = require('../middlewares/isLogin')

route.get('/', ArticleController.getArticle)
route.get('/me', isLogin, ArticleController.getMyArticle)
route.get('/:id', ArticleController.getDetailArticle)
route.put('/', isLogin, ArticleController.updateArticle)
route.delete('/', isLogin, ArticleController.deleteArticle)
route.post('/', isLogin, ArticleController.postArticle)

module.exports = route
