const express = require("express")
const userRoutes = require("./users/user-routes")

const router = express.Router()

router.get("/", (req, res) => {
   res.json({ version: "1.0.0" })
})

router.use("/users", userRoutes)

module.exports = router
