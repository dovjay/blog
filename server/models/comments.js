require('dotenv').config()
const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect(process.env.MLAB)

const CommentSchema = new Schema({
  content: {
    type: String,
    required: [true, "Please insert at least 1 character"]
  },
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "We need your ID!"]
  },
  articleId: {
    type: Schema.Types.ObjectId,
    ref: 'Article',
    required: [true, "We need the article ID!"]
  }
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
