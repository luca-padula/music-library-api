const bcrypt = require("bcryptjs")
const User = require("../models/user.js")

module.exports.getUserById = async function (userId) {
   return await User.findById(userId).exec()
}

module.exports.createUser = async function (userData) {
   let newUser = new User(userData)
   return await newUser.save()
}

module.exports.hashPassword = async function (password) {
   return await bcrypt.hash(password, 10)
}
