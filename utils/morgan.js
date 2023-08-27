/* eslint-disable no-unused-vars */
const morgan = require('morgan')
const colors = require('ansi-colors')

// Define custom tokens for morgan
morgan.token('colorMethod', (req, _res) => {
  return colors.blue(req.method)
})
morgan.token('colorUrl', (req, _res) => {
  const url = req.originalUrl || req.url
  return colors.yellow(url)
})
morgan.token('colorStatus', (req, res) => {
  const status = res.statusCode
  const color =
    status >= 500
      ? 'red'
      : status >= 400
      ? 'yellow'
      : status >= 300
      ? 'cyan'
      : 'green'
  return colors[color](status)
})
const morganFormat =
  ':colorMethod :colorUrl :colorStatus :res[content-length] - :response-time ms'

module.exports = morganFormat
