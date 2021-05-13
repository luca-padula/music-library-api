const express = require("express")
const userController = require("../../controllers/user-controller.js")
const validators = require("../../middleware/validators/validators.js")
const userValidators = require("../../middleware/validators/user-validators.js")

const router = express.Router()

router.post(
   "/register",
   userValidators.userValidationRules(),
   validators.validateRequest,
   async (req, res, next) => {
      try {
         let createdUser = await userController.registerUser(req.body)
         res.status(201).json({ createdUser })
      } catch (err) {
         next(err)
      }
   }
)

router.post("/login", async (req, res, next) => {
   try {
      let user = await userController.login(req.body)
      res.json({ user })
   } catch (err) {
      next(err)
   }
})

module.exports = router
