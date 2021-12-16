const express = require('express')
const {engine} = require('express-handlebars')
const database = require('./models/shorturl')
require('./config/mongoose')

const routes = require('./routes')
const app = express()

const port = 3000



app.engine('handlebars', engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(routes)



app.listen(port, () => {
  console.log('connect')
})