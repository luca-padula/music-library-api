const express = require("express")
const userController = require("../../controllers/user-controller.js")
const validators = require("../../middleware/validators/validators.js")
const userValidators = require("../../middleware/validators/user-validators.js")
const nestedPlaylistRoutes = require("./user-playlists/user-playlists-routes.js")

const router = express.Router()

router.param("userId", userValidators.validateUserIdReqParam)

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
      let token = await userController.login(req.body)
      res.json({ token })
   } catch (err) {
      next(err)
   }
})

router.use("/:userId/playlists", nestedPlaylistRoutes)

module.exports = router
