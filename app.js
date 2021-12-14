const express = require('express')
const mongoose = require('mongoose')
const {engine} = require('express-handlebars')
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

app.engine('handlebars', engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log('connect')
})