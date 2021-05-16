const express = require("express")
const passport = require("passport")
const albumController = require("../../controllers/album-controller.js")
const albumValidators = require("../../middleware/validators/album-validators.js")
const validators = require("../../middleware/validators/validators.js")

const router = express.Router()

router.get("/", async (req, res, next) => {
   res.send("get all albums")
})

router.post(
   "/",
   albumValidators.albumValidationRules(),
   validators.validateRequest,
   async (req, res, next) => {
      try {
         let createdAlbum = await albumController.addAlbum(req.body)
         res.status(201).json({ createdAlbum })
      } catch (err) {
         next(err)
      }
   }
)

module.exports = router
