const express = require("express")
const passport = require("passport")
const artistController = require("../../controllers/artist-controller.js")
const artistValidators = require("../../middleware/validators/artist-validators.js")
const validators = require("../../middleware/validators/validators.js")

const router = express.Router()

router.param("artistId", artistValidators.verifyArtistIdReqParam)

router.get("/", async (req, res, next) => {
   try {
      let artists = await artistController.getAllArtists()
      res.json({ artists })
   } catch (err) {
      next(err)
   }
})

router.post(
   "/",
   passport.authenticate("jwt", { session: false }),
   artistValidators.artistValidationRules(),
   validators.validateRequest,
   async (req, res, next) => {
      try {
         let createdArtist = await artistController.addArtist(req.body)
         res.status(201).json({ createdArtist })
      } catch (err) {
         next(err)
      }
   }
)

router.get("/:artistId", async (req, res, next) => {
   let artist = req.artist
   res.json({ artist })
})

router.patch(
   "/:artistId",
   passport.authenticate("jwt", { session: false }),
   artistValidators.updateArtistValidationRules(),
   validators.validateRequest,
   async (req, res, next) => {
      try {
         let artistId = req.params.artistId
         let updatedArtist = await artistController.updateArtist(
            artistId,
            req.body
         )
         res.json({ updatedArtist })
      } catch (err) {
         next(err)
      }
   }
)

module.exports = router
