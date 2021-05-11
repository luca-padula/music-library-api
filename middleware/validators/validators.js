const { validationResult } = require("express-validator")

module.exports.validateRequest = function (req, res, next) {
   const errors = validationResult(req)
   if (errors.isEmpty()) {
      return next()
   }
   // map errors to validation errors, probably through util function
   // since validateRequest() probably shouldnt handle mapping errors
   // probably create classes for custom error types
   return next({ expressValidatorErrors: errors.array() })
}
