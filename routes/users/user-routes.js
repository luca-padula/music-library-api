const express = require("express")
const userController = require("../../controllers/user-controller.js")

const router = express.Router()

router.post("/register", async (req, res, next) => {
   try {
      let createdUser = await userController.registerUser(req.body)
      res.status(201).json({ createdUser })
   } catch (err) {
      next(err)
   }
})

module.exports = router
