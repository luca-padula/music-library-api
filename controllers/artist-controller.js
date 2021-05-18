const artistService = require("../services/artist-service.js")
const ApiError = require("../utils/error-classes/api-error.js")

module.exports.getAllArtists = async function () {
   return await artistService.getAllArtists()
}

module.exports.getArtist = async function (artistId) {
   return await artistService.getArtistById(artistId)
}

module.exports.addArtist = async function (artistData) {
   return await artistService.createArtist(artistData)
}

module.exports.updateArtist = async function (artistId, artistData) {
   const fieldsToUpdate = Object.keys(artistData)
   if (fieldsToUpdate.length == 0) {
      throw new ApiError(422, "no artist data given to update")
   }
   return await artistService.updateArtist(artistId, artistData)
}
