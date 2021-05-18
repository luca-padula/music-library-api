const albumService = require("../services/album-service.js")
const ApiError = require("../utils/error-classes/api-error.js")

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

module.exports.updateAlbum = async function (albumId, albumData) {
   const fieldsToUpdate = Object.keys(albumData)
   if (fieldsToUpdate.length == 0) {
      throw new ApiError(422, "no album data given to update")
   }
   return await albumService.updateAlbumById(albumId, albumData)
}
