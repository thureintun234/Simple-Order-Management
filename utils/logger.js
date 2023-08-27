const winston = require('winston')
const { format } = require('winston')

const myFormat = format.printf(({ level, message }) => {
  let colorizedLevel

  switch (level) {
    case 'info':
      colorizedLevel = level.blue
      break
    case 'error':
      colorizedLevel = level.red
      break
    default:
      colorizedLevel = level
  }

  return `[${colorizedLevel}] ${message}`
})

const logger = winston.createLogger({
  level: 'info',
  levels: winston.config.npm.levels,
  format: format.combine(format.colorize(), myFormat),
  transports: [new winston.transports.Console()],
})

const error = (...message) => {
  logger.error(message.join(' '))
}

const info = (...message) => {
  logger.info(message.join(' '))
}

module.exports = { error, info }
