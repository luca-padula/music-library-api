const Album = require("../models/album.js")

module.exports.getAllAlbums = async function () {
   return await Album.find().lean().exec()
}

module.exports.getAlbumById = async function (albumId) {
   return await Album.findById(albumId).populate("artist").lean().exec()
}

module.exports.getAlbumsByArtistId = async function (artistId) {
   return await Album.find({ artist: artistId })
      .populate("artist")
      .lean()
      .exec()
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
