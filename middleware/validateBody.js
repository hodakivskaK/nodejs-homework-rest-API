const { HttpError } = require('../helpers')

const validateBodyPut = schema => {
  
  const func = (req, res, next) => {

    if (JSON.stringify(req.body) === "{}") {
      next(HttpError(400, 'missing fields'))
    }
<<<<<<< HEAD
    const { error } = schema.validate(req.body);
=======
      
    if (JSON.stringify(req.body) === "{}") {
       next(HttpError(400, 'missing fields'))
    }


      const { error } = schema.validate(req.body);
>>>>>>> e9e67de8b9b0dab1dab6b37e2a979045c8c08c85

    if (error) {
      next(HttpError(400, error.message))
<<<<<<< HEAD
    }
    next()
  }

  return func;
=======
        }
        next()

}
    
    return func;
>>>>>>> e9e67de8b9b0dab1dab6b37e2a979045c8c08c85
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