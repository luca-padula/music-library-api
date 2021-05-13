const userService = require("../services/user-service.js")
const ApiError = require("../utils/error-classes/api-error.js")

module.exports.registerUser = async function (userData) {
   userData.password = await userService.hashPassword(userData.password)
   return await userService.createUser(userData)
}

module.exports.login = async function (credentials) {
   let user = await userService.getUserByUsername(credentials.userName)
   if (user == null) {
      throw new ApiError(422, "incorrect username or password entered")
   }
   let passwordsMatch = await userService.checkPassword(
      credentials.password,
      user.password
   )
   if (!passwordsMatch) {
      throw new ApiError(422, "incorrect username or password entered")
   }
   return user
}

module.exports.getUser = async function (userId) {
   return await userService.getUserById(userId)
}
