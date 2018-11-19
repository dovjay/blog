const Article = require('../models/articles')

class ArticleController {
  static getArticle (req, res) {
    Article.find({})
    .populate('author', ['-password', '-salt'])
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static getMyArticle (req, res) {
    Article.find({ author: req.decoded.id })
      .populate('author', ['-password', '-salt'])
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static getDetailArticle (req, res) {
    Article.findById(req.params.id)
      .populate('author', ['-password', '-salt'])
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static postArticle (req, res) {
    let article = new Article({
      title: req.body.title,
      author: req.decoded.id,
      content: req.body.content
    })
    
    article.save()
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static updateArticle (req, res) {
    Article.findOneAndUpdate({
      _id: req.body.id,
      author: req.decoded.id
    }, {
      title: req.body.title,
      content: req.body.content,
      timestamp: new Date()
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static deleteArticle (req, res) {
    Article.findByIdAndDelete(req.body.articleId)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = ArticleController
