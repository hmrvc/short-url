const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortUrlSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  shortenUrl: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Data', shortUrlSchema)
