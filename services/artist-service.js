const Artist = require("../models/artist.js")

module.exports.getAllArtists = async function () {
   return await Artist.find()
}

module.exports.getArtistById = async function (artistId) {
   return await Artist.findById(artistId)
}

module.exports.createArtist = async function (artistData) {
   let newArtist = new Artist(artistData)
   return await newArtist.save()
}
