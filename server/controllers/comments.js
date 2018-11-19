const Comment = require('../models/comments')

class CommentController {
  static getComment (req, res) {
    Comment.find({ articleId: req.headers.articleid })
      .populate('writer', ['-password', '-salt'])
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static postComment (req, res) {
    let comment = new Comment({
      content: req.body.content,
      writer: req.decoded.id,
      articleId: req.body.articleId
    })

    comment.save()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static deleteComment (req, res) {
    Comment.findOneAndDelete({
      _id: req.body.id,
      writer: req.decoded.id
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = CommentController
