const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema(
   {
      userName: {
         type: String,
         required: true,
         unique: true,
      },
      firstName: {
         type: String,
         required: true,
      },
      lastName: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
)

const User = mongoose.model("User", userSchema)

module.exports = User
