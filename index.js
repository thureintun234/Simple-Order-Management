const app = require('./app.js')
const config = require('./utils/config.js')
const logger = require('./utils/logger.js')

const server = app.listen(config.PORT, () => {
  logger.info(`Server running on port: ${config.PORT}`)
})

// Handling unhandled promise rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`)
  console.log('Shutting down the server due to handle promise rejection')
  server.close(() => {
    process.exit(1)
  })
})
