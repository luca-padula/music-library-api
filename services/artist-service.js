const Artist = require("../models/artist.js")

module.exports.getAllArtists = async function () {
   return await Artist.find().exec()
}

module.exports.getArtistById = async function (artistId) {
   return await Artist.findById(artistId).exec()
}

module.exports.createArtist = async function (artistData) {
   let newArtist = new Artist(artistData)
   return await newArtist.save()
}

module.exports.updateArtist = async function (artistId, artistData) {
   return await Artist.findByIdAndUpdate(
      artistId,
      { $set: artistData },
      { new: true }
   ).exec()
}
