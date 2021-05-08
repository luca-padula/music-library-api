const express = require("express")
const cors = require("cors")
require("dotenv").config()
const db = require("./db")
const User = require("./models/user")

const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.HTTP_PORT

db.initializeDatabase(process.env.MONGO_CONNECTION_STRING)
   .then(() => {
      app.listen(port, () => console.log(`app listening on port ${port}`))
   })
   .catch((err) => {
      console.log(`unable to start the server: ${err}`)
   })
