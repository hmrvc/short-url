const express = require('express')
const mongoose = require('mongoose')
const {engine} = require('express-handlebars')
const database = require('./models/shorturl')
const generateUrl = require('./shortener')
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
  //沒輸入網址則不動作
  if (! url) return res.redirect('/')
  
//產生五碼亂數字元
  const shortUrl = generateUrl(5)
//輸入網址是否已存在 回傳第一個符合條件的結果
  database.findOne({url: url})
    .then(item => 
      item ? item: database.create({ shortenUrl: shortUrl, url})
    )
    .then(item => {
      res.render('index', {
        header: req.headers.origin,
        shorten: item.shortenUrl,
        url
      }) 
    })
    .catch(error => console.log(error))  
})

//新增縮網址的路由
app.get('/:shortenUrl', (req, res) => {
  const short = req.params.shortenUrl
  database.findOne({shortenUrl:  short})
    .lean()
    .then(item => {
      res.redirect(item.url)
    })
    .catch(error => {
      res.render('index', {error})
    })
})

app.listen(port, () => {
  console.log('connect')
})