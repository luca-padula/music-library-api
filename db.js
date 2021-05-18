const mongoose = require("mongoose")

module.exports.initializeDatabase = function (mongoDBConnectionString) {
   return new Promise((resolve, reject) => {
      mongoose.connect(mongoDBConnectionString, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
         useFindAndModify: false,
      })

      mongoose.connection.on("error", (err) => {
         reject(err)
      })

      mongoose.connection.once("open", () => {
         console.log("Database successfully initialized")
         resolve()
      })
   })
}
