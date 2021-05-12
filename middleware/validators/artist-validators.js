const { checkSchema } = require("express-validator")

module.exports.artistValidationRules = function () {
   return checkSchema({
      name: {
         exists: true,
         isEmpty: false,
         errorMessage: "invalid name entered",
      },
   })
}
