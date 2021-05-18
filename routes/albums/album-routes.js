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
   passport.authenticate("jwt", { session: false }),
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

router.patch(
   "/:albumId",
   passport.authenticate("jwt", { session: false }),
   albumValidators.updateAlbumValidationRules(),
   validators.validateRequest,
   async (req, res, next) => {
      const albumId = req.params.albumId
      try {
         let updatedAlbum = await albumController.updateAlbum(albumId, req.body)
         res.json({ updatedAlbum })
      } catch (err) {
         next(err)
      }
   }
)

module.exports = router
