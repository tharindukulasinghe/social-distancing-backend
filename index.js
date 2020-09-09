const express = require('express')
const compression = require('compression')
const app = express()
require('express-async-errors')
const cors = require('cors')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
const morgan = require('morgan')

const http_port = 3011

const db_name = 'covid'
const environment = process.env.environment || 'dev'

app.use(compression())
app.use(express.static('logs'))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(express.static('uploads'))
app.use(cors())

app.use(morgan('dev'))

const users = require('./routes/User')
app.use('/api/user', users)

app.get('*', function (req, res, next) {
  throw new Error('Endpoint not available')
})

const uri = 'mongodb://localhost:27017'

const url = 'mongodb://35.197.129.105:27017'

mongoose
  .connect(uri, {
    dbName: 'covid',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((value) => {
    console.log(`Connected to database : ${db_name}`)
  })
  .catch((err) => {
    console.log(err.message)
  })

app.listen(http_port, () => {
  console.log(`http Server is listening on port : ${http_port}`)
})
