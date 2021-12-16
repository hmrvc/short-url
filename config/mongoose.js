const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/short-url')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongdb connected')
})

