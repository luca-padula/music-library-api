const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
   res.json({ message: "getting all users" })
})

module.exports = router
