const artistService = require("../services/artist-service.js")

module.exports.getAllArtists = async function () {
   return await artistService.getAllArtists()
}

module.exports.addArtist = async function (artistData) {
   return await artistService.createArtist(artistData)
}
