const { validationResult } = require("express-validator")

module.exports.validateRequest = function (req, res, next) {
   const errors = validationResult(req)
   if (errors.isEmpty()) {
      return next()
   }
   return next({ expressValidatorErrors: errors.array() })
}
