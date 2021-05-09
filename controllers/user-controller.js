const userService = require("../services/user-service")

module.exports.registerUser = async function (userData) {
   userData.password = await userService.hashPassword(userData.password)
   return await userService.createUser(userData)
}
