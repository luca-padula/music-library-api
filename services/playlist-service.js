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

module.exports.savePlaylist = async function (playlistDocument) {
   return await playlistDocument.save()
}

module.exports.createPlaylist = async function (playlistData) {
   let newPlaylist = new Playlist(playlistData)
   return await newPlaylist.save()
}

module.exports.updatePlaylistById = async function (playlistId, playlistData) {
   return await Playlist.findByIdAndUpdate(
      playlistId,
      { $set: playlistData },
      { new: true }
   )
}

module.exports.deletePlaylistById = async function (playlistId) {
   return await Playlist.findByIdAndDelete(playlistId)
}
