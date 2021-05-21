const Playlist = require("../models/playlist.js")

module.exports.getAllPlaylists = async function () {
   return await Playlist.find().lean().exec()
}

module.exports.getPlaylistById = async function (playlistId) {
   return await Playlist.findById(playlistId).populate("albums").lean().exec()
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
