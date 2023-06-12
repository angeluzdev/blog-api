const boom = require('@hapi/boom');

const isAuthenticate = (req, res, next) => {
  if(req.user) {
    return next();
  }
  next(boom.unauthorized('No authenticate'));
}

const isNotAuthenticate = (req, res, next) => {
  if(!req.user) {
    return next();
  }
  next(boom.conflict('You are already authenticated'))
}

module.exports = {isAuthenticate, isNotAuthenticate};