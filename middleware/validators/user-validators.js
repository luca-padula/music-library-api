const { checkSchema } = require("express-validator")
const userService = require("../../services/user-service.js")
const ApiError = require("../../utils/error-classes/api-error.js")

async function checkUsernameTaken(value, { req }) {
   let foundUser = await userService.getUserByUsername(value)
   if (foundUser != null) {
      throw new Error("username already taken")
   }
}

module.exports.userValidationRules = function () {
   return checkSchema({
      userName: {
         trim: true,
         exists: {
            errorMessage: "no username entered",
            bail: true,
         },
         isEmpty: {
            negated: true,
            errorMessage: "username cannot be empty",
            bail: true,
         },
         isLength: {
            options: { max: 30 },
            errorMessage: "username cannot be longer than 30 characters",
         },
         custom: {
            options: checkUsernameTaken,
         },
      },
      password: {
         isLength: {
            errorMessage: "password must be at least 6 characters long",
            options: { min: 6 },
         },
      },
      firstName: {
         trim: true,
         exists: {
            errorMessage: "no first name entered",
         },
         isEmpty: {
            negated: true,
            errorMessage: "empty first name entered",
         },
         isLength: {
            options: { max: 30 },
            errorMessage: "username cannot be longer than 30 characters",
         },
      },
      lastName: {
         trim: true,
         exists: {
            errorMessage: "no last name entered",
         },
         isEmpty: {
            negated: true,
            errorMessage: "empty last name entered",
         },
         isLength: {
            options: { max: 30 },
            errorMessage: "username cannot be longer than 30 characters",
         },
      },
   })
}

module.exports.validateUserIdReqParam = async function (req, res, next) {
   const userId = req.params.userId
   try {
      const user = await userService.getUserById(userId)
      if (user == null) {
         throw new ApiError(404, "user id does not exist")
      }
      req.foundUser = user
      next()
   } catch (err) {
      next(err)
   }
}
