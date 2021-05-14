const artistService = require("../services/artist-service.js")

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
   return await artistService.updateArtist(artistId, artistData)
}
