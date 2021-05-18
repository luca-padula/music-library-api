const express = require("express")
const passport = require("passport")
const albumController = require("../../controllers/album-controller.js")
const albumValidators = require("../../middleware/validators/album-validators.js")
const validators = require("../../middleware/validators/validators.js")

const router = express.Router()

router.param("albumId", albumValidators.validateAlbumIdReqParam)

router.get("/", async (req, res, next) => {
   try {
      let albums = await albumController.getAllAlbums()
      res.json({ albums })
   } catch (err) {
      next(err)
   }
})

router.get("/:albumId", async (req, res, next) => {
   let album = req.album
   res.json({ album })
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
