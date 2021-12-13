const express = require('express')
const Schema = express.Schema()
const shortUrlSchema = new Schema({
  url: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Short', shortUrlSchema)
