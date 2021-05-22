const express = require("express")
const passport = require("passport")
const playlistController = require("../../../controllers/playlist-controller.js")
const albumValidators = require("../../../middleware/validators/album-validators.js")
const playlistValidators = require("../../../middleware/validators/playlist-validators.js")

const router = express.Router({ mergeParams: true })

router.put(
   "/:albumId",
   passport.authenticate("jwt", { session: false }),
   playlistValidators.validateUserOwnsPlaylist,
   albumValidators.validateAlbumIdReqParam,
   async (req, res, next) => {
      try {
         const playlistId = req.params.playlistId
         const albumId = req.params.albumId
         const updatedPlaylist = await playlistController.addAlbumToPlaylist(
            playlistId,
            albumId
         )
         res.json({ updatedPlaylist })
      } catch (err) {
         next(err)
      }
   }
)

router.delete(
   "/:albumId",
   passport.authenticate("jwt", { session: false }),
   playlistValidators.validateUserOwnsPlaylist,
   async (req, res, next) => {
      const playlistId = req.params.playlistId
      const albumId = req.params.albumId
      try {
         const updatedPlaylist =
            await playlistController.removeAlbumFromPlaylist(
               playlistId,
               albumId
            )
         res.json({ updatedPlaylist })
      } catch (err) {
         next(err)
      }
   }
)

module.exports = router
