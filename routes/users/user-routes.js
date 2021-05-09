const express = require("express")
const userController = require("../../controllers/user-controller")

const router = express.Router()

router.get("/", (req, res) => {
   res.json({ message: "getting all users" })
})

router.post("/register", async (req, res) => {
   try {
      let createdUser = await userController.registerUser(req.body)
      res.json({ createdUser })
   } catch (err) {
      console.log(err)
      res.status(422).end()
   }
})

module.exports = router
