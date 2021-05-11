const userService = require("../services/user-service.js")

module.exports.registerUser = async function (userData) {
   userData.password = await userService.hashPassword(userData.password)
   return await userService.createUser(userData)
}

module.exports.getUser = async function (userId) {
   return await userService.getUserById(userId)
}
