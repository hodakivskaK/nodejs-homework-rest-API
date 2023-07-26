const { HttpError } = require('../helpers')

const validateBodyPut = schema => {
  
  const func = (req, res, next) => {

    if (JSON.stringify(req.body) === "{}") {
      next(HttpError(400, 'missing fields'))
    }
    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, error.message))
    }
    next()
  }

  return func;
}

const validateBodyPatch = schema => {
  const func = (req, res, next) => {

    if (JSON.stringify(req.body) === "{}") {
      next(HttpError(400, 'missing field favorite'))
    }
    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, error.message))
    }
    next()
  }

  return func;
}

const validate = {
  validateBodyPut,
  validateBodyPatch
}

module.exports = validate