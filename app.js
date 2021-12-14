const express = require('express')
const mongoose = require('mongoose')
const {engine} = require('express-handlebars')
const database = require('./models/shorturl')
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
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const url = req.body.url
  console.log(url)
//產生五碼亂數字元
  const CHARLIST = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const CHARNUM = CHARLIST.length
  const TARGETNUM = 5

  let result = ''
  for (let i = 0; i < TARGETNUM; i++) {
    let choosenIndex = Math.floor(Math.random() * CHARNUM)
    let choosenChar = CHARLIST[choosenIndex]
    result += choosenChar
  } 
  console.log(result)
  database.create({ shortenUrl: result, url})
})


app.listen(port, () => {
  console.log('connect')
})