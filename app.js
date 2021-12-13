const express = require('express')
const mongoose = require('mongoose')
const app = express()

const port = 3000

mongoose.connect('mongodb://localhost/short-url')
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongdb connect!')
})

app.get('/', (req, res) => {
  res.send(`<h1>Hi</h1>`)
})

app.listen(port, () => {
  console.log('connect')
})