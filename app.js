const express = require('express')
const mongoose = require('mongoose')
const {engine} = require('express-handlebars')
const database = require('./models/shorturl')

const routes = require('./routes')
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
app.use(routes)



app.listen(port, () => {
  console.log('connect')
})