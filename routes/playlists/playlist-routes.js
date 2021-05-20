const express = require("express")
const passport = require("passport")
const playlistController = require("../../controllers/playlist-controller.js")
const playlistValidators = require("../../middleware/validators/playlist-validators.js")
const validators = require("../../middleware/validators/validators.js")

const router = express.Router()

router.param("playlistId", playlistValidators.validatePlaylistIdReqParam)

router.get("/", async (req, res, next) => {
   try {
      const playlists = await playlistController.getAllPlaylists()
      res.json({ playlists })
   } catch (err) {
      next(err)
   }
})

router.post(
   "/",
   passport.authenticate("jwt", { session: false }),
   playlistValidators.playlistValidationRules(),
   validators.validateRequest,
   async (req, res, next) => {
      try {
         let createdPlaylist = await playlistController.addPlaylist(req.body)
         res.status(201).json({ createdPlaylist })
      } catch (err) {
         next(err)
      }
   }
)

router.get("/:playlistId", async (req, res, next) => {
   const playlist = req.playlist
   res.json({ playlist })
})

router.delete(
   "/:playlistId",
   passport.authenticate("jwt", { session: false }),
   playlistValidators.validateUserOwnsPlaylist,
   async (req, res, next) => {
      const playlistId = req.params.playlistId
      try {
         await playlistController.deletePlaylist(playlistId)
         res.status(204).end()
      } catch (err) {
         next(err)
      }
   }
)

module.exports = router
