const Playlist = require("../models/playlist.js")

module.exports.getAllPlaylists = async function () {
   return await Playlist.find().populate("albums").exec()
}

module.exports.getPlaylistById = async function (playlistId) {
   return await Playlist.findById(playlistId).exec()
}

module.exports.getPlaylistsByUser = async function (userId) {
   return await Playlist.find({ creator: userId }).lean().exec()
}

module.exports.createPlaylist = async function (playlistData) {
   let newPlaylist = new Playlist(playlistData)
   return await newPlaylist.save()
}
