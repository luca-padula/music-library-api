const mongoose = require("mongoose")
const User = require("../models/user")

module.exports.registerUser = function (userData) {
   return new Promise((resolve, reject) => {
      resolve("successfully registered user")
   })
}
