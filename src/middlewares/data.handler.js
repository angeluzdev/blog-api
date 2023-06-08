const boom = require('@hapi/boom');

function validateData(params, validator) {
  return (req, res, next) => {
    const {error} = validator.validate(req[params], {abortEarly: false});
    if(error) next(boom.badRequest(error));
    next();
  }
}

function valdiateDataDirect(req,res,next) {
  const {error} = validator.validate(req['params'], {abortEarly: false});
  if(error) next(boom.badRequest(error));
  next();
}

module.exports = validateData;