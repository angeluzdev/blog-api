function isBoomError(error, req, res, next) {
  if(error.isBoom) {
    const payload = error.output.payload;
    return res.status(payload.statusCode).json(payload);
  }
  next(error)
}

function internalError(error, req, res, next) {
  res.status(500).json({
    message: error.message
  })
}

module.exports = {isBoomError, internalError};