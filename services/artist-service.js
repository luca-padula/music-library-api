const Artist = require("../models/artist.js")

module.exports.getAllArtists = async function () {
   return await Artist.find()
}

module.exports.createArtist = async function (artistData) {
   let newArtist = new Artist(artistData)
   return await newArtist.save()
}
