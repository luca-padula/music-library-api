const albumService = require("../services/album-service.js")

module.exports.addAlbum = async function (albumData) {
   return await albumService.createAlbum(albumData)
}
