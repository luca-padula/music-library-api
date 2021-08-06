const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtSecret = require("../config/jwt-config.js")
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

module.exports.buildJwtToken = function (user) {
   const payload = {
      _id: user._id,
      userName: user.userName,
   }
   const token = jwt.sign(payload, jwtSecret, { expiresIn: 60 * 60 })
   return token
}
