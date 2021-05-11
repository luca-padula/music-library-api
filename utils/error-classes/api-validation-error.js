const ApiError = require("./api-error.js")

class ApiValidationError extends ApiError {
   constructor(status, message, validationErrors) {
      super(status, message)
      this.validationErrors = validationErrors
   }
}

module.exports = ApiValidationError
