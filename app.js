const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const morgan = require('morgan')
const morganFormat = require('./utils/morgan')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

const BASE_URL = '/api/v1'
const orderRouter = require('./routes/order.route')

mongoose.set('strictQuery', false)
mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(morgan(morganFormat))

// accepting uploaded photos
app.use(`${BASE_URL}/uploads`, express.static(path.join(__dirname, 'uploads')))
app.use(`${BASE_URL}/orders`, orderRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
