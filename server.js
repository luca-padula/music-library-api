const express = require("express")
const cors = require("cors")
const passport = require("passport")
require("dotenv").config()
const passportConfig = require("./config/passport-config.js")
const db = require("./db.js")
const apiRouter = require("./routes/api-routes.js")

const app = express()

app.use(passport.initialize())
app.use(cors())
app.use(express.json())

const port = process.env.HTTP_PORT

app.use("/api", apiRouter)

db.initializeDatabase(process.env.MONGO_CONNECTION_STRING)
   .then(() => {
      app.listen(port, () => console.log(`app listening on port ${port}`))
   })
   .catch((err) => {
      console.log(`unable to start the server: ${err}`)
   })
