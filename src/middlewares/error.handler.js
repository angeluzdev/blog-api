function isBoomError(error, req, res, next) {
  if(error.isBoom) {
    const payload = error.output.payload;
    return res.status(payload.statusCode).json(payload);
  }
  next(error)
}

function internalError(error, req, res, next) {
  res.status(500).json({
    statusCode: 500,
    error: error.message
  })
}

module.exports = {isBoomError, internalError};