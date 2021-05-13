const { checkSchema } = require("express-validator")

module.exports.artistValidationRules = function () {
   return checkSchema({
      name: {
         exists: {
            errorMessage: "no artist name entered",
            bail: true,
         },
         isEmpty: {
            negated: true,
            errorMessage: "artist name cannot be empty",
            bail: true,
         },
      },
   })
}
