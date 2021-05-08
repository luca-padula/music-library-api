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
         default: "",
      },
      lastName: {
         type: String,
         default: "",
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
