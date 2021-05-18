const express = require("express")
const albumController = require("../../../controllers/album-controller.js")

const router = express.Router({ mergeParams: true })

router.get("/", async (req, res, next) => {
   const artistId = req.artist._id
   try {
      let albums = await albumController.getAlbumsByArtist(artistId)
      res.json(albums)
   } catch (err) {
      next(err)
   }
})

module.exports = router
