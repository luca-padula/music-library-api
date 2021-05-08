const express = require("express")
const userController = require("../../controllers/user-controller")

const router = express.Router()

router.get("/", (req, res) => {
   res.json({ message: "getting all users" })
})

router.post("/register", async (req, res) => {
   try {
      let msg = await userController.registerUser(req.body)
      res.json({ message: msg })
   } catch (err) {
      res.status(422).send()
   }
})

module.exports = router
