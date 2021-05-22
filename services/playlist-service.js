const Playlist = require("../models/playlist.js")

module.exports.getAllPlaylists = async function () {
   return await Playlist.find().lean().exec()
}

module.exports.getPlaylistById = async function (playlistId) {
   return await Playlist.findById(playlistId).populate("albums").lean().exec()
}

// Retrieves full mongoose document compared to similar function that gets
// plain js object. Full document has extra functionality like saving
// but makes the query slower.
module.exports.getPlaylistByIdFullDoc = async function (playlistId) {
   return await Playlist.findById(playlistId).exec()
}

module.exports.getPlaylistsByUser = async function (userId) {
   return await Playlist.find({ creator: userId }).lean().exec()
}

module.exports.createPlaylist = async function (playlistData) {
   let newPlaylist = new Playlist(playlistData)
   return await newPlaylist.save()
}

module.exports.deletePlaylistById = async function (playlistId) {
   return await Playlist.findByIdAndDelete(playlistId)
}

module.exports.addAlbumToPlaylist = async function (albumId, playlistDocument) {
   const newAlbumsArr = [...playlistDocument.albums, albumId]
   playlistDocument.albums = newAlbumsArr
   return await playlistDocument.save()
}

module.exports.removeAlbumFromPlaylist = async function (
   albumId,
   playlistDocument
) {
   const albumIndex = playlistDocument.albums.indexOf(albumId)
   playlistDocument.albums.splice(albumIndex, 1)
   return await playlistDocument.save()
}
