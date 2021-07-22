const logger = require('../logger')
const createError = require('http-errors')
const app = require('../server')
const server = app.server

exports.logError = (err) =>{
 logger.error(err)
}


const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const ExceptionHandler = error => {
  logger.error("unexpected  " +error.stack);

  exitHandler()
}
const RejectionHandler = error => {
  logger.error("Rejection  " +error.message);

  exitHandler()
}
process.on('uncaughtException', ExceptionHandler)
process.on('unhandledRejection', RejectionHandler)

isOperational = err => {
    const errorType = createError.isHttpError(err);

    if(errorType || err.isJoi )
    return true
    else return false
}

exports.errorHandler =  (err, req, res, next) => {
   logger.error(err.message)
  if (!isOperational(err)) {
    logError(`shutting down due to ${err.stack}`)
    process.exit(1)
  } else {
    res.status(err.status || 500)
    res.send({
      error: {
        status: err.status || 500,
        message: err.message
      }
    })
  }
}