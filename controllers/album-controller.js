const albumService = require("../services/album-service.js")

module.exports.getAllAlbums = async function () {
   return await albumService.getAllAlbums()
}

module.exports.getAlbum = async function (albumId) {
   return await albumService.getAlbumById(albumId)
}

module.exports.addAlbum = async function (albumData) {
   return await albumService.createAlbum(albumData)
}

module.exports.getAlbumsByArtist = async function (artistId) {
   return await albumService.getAlbumsByArtistId(artistId)
}
