const express = require("express")
const userRoutes = require("./users/user-routes.js")
const artistRoutes = require("./artists/artist-routes.js")
const albumRoutes = require("./albums/album-routes.js")
const playlistRoutes = require("./playlists/playlist-routes.js")
const errorHandler = require("../middleware/error-handler.js")

const router = express.Router()

router.get("/", (req, res) => {
   res.json({ version: "1.0.0" })
})

router.use("/users", userRoutes)
router.use("/artists", artistRoutes)
router.use("/albums", albumRoutes)
router.use("/playlists", playlistRoutes)

router.use(errorHandler)

module.exports = router
