const { checkSchema } = require("express-validator")
const userService = require("../../services/user-service.js")

module.exports.userValidationRules = function () {
   return checkSchema({
      userName: {
         exists: {
            errorMessage: "no username entered",
            bail: true,
         },
         isEmpty: {
            negated: true,
            errorMessage: "invalid username entered",
            bail: true,
         },
         custom: {
            options: async (value, { req }) => {
               let foundUser = await userService.getUserByUsername(value)
               if (foundUser != null) {
                  throw new Error("username already taken")
               }
            },
         },
      },
      password: {
         isLength: {
            errorMessage: "Password should be at least 6 chars long",
            // Multiple options would be expressed as an array
            options: { min: 6 },
         },
      },
      firstName: {
         exists: true,
         isEmpty: false,
         errorMessage: "invalid first name entered",
      },
      lastName: {
         exists: true,
         isEmpty: false,
         errorMessage: "invalid last name entered",
      },
   })
}
