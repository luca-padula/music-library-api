const Album = require("../models/album.js")

module.exports.getAllAlbums = async function () {
   return await Album.find().lean().exec()
}

module.exports.getAlbumById = async function (albumId) {
   return await Album.findById(albumId).lean().exec()
}

module.exports.getAlbumsByArtistId = async function (artistId) {
   return await Album.find({ artist: artistId }).lean().exec()
}

module.exports.createAlbum = async function (albumData) {
   let newAlbum = new Album(albumData)
   return await newAlbum.save()
}

module.exports.updateAlbumById = async function (albumId, albumData) {
   return await Album.findByIdAndUpdate(
      albumId,
      { $set: albumData },
      { new: true }
   ).exec()
}

module.exports.updateAlbumArtistNames = async function (
   artistId,
   newArtistName
) {
   return await Album.updateMany(
      { artist: artistId },
      { artistName: newArtistName }
   )
}
