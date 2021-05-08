const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.HTTP_PORT

app.listen(port, () => console.log(`app listening on port ${port}`))
