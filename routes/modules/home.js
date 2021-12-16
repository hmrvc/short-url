const express = require('express')
const router = express.Router()
const database = require('../../models/shorturl')
const generateUrl = require('../../shortener')


router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
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
router.get('/:shortenUrl', (req, res) => {
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



module.exports = router



