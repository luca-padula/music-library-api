const express = require("express")
const playlistController = require("../../../controllers/playlist-controller.js")

const router = express.Router({ mergeParams: true })

router.get("/", async (req, res, next) => {
   const userId = req.params.userId
   try {
      const playlists = await playlistController.getPlaylistsByUser(userId)
      res.json(playlists)
   } catch (err) {
      next(err)
   }
})

module.exports = router
