const bcrypt = require("bcryptjs")
const User = require("../models/user.js")

module.exports.getUserById = async function (userId) {
   return await User.findById(userId).exec()
}

module.exports.getUserByUsername = async function (userName) {
   return await User.findOne({ userName }).exec()
}

module.exports.createUser = async function (userData) {
   let newUser = new User(userData)
   return await newUser.save()
}

module.exports.hashPassword = async function (password) {
   return await bcrypt.hash(password, 10)
}

module.exports.checkPassword = async function (input, hash) {
   return await bcrypt.compare(input, hash)
}
