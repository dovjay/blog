require('dotenv').config()
const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect(process.env.MLAB)

const ArticleSchema = new Schema({
  title: {
    type: String,
    default: 'Blank Title'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  timestamp: {
    type: Date,
    default: new Date()
  },
  content: {
    type: String,
    default: ''
  }
})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article
