const { checkSchema } = require("express-validator")

module.exports.userValidationRules = function () {
   return checkSchema({
      password: {
         isLength: {
            errorMessage: "Password should be at least 6 chars long",
            // Multiple options would be expressed as an array
            options: { min: 6 },
         },
      },
   })
}
