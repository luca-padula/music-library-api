const express = require("express")

const router = express.Router({ mergeParams: true })

router.put("/:albumId", async (req, res, next) => {
   res.send("adding album to playlist")
})

router.delete("/:albumId", async (req, res, next) => {
   res.send("deleting album from playlist")
})

module.exports = router
