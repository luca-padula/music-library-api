const Playlist = require("../models/playlist.js")

module.exports.getAllPlaylists = async function () {
   return await Playlist.find().populate("albums").exec()
}

module.exports.createPlaylist = async function (playlistData) {
   let newPlaylist = new Playlist(playlistData)
   return await newPlaylist.save()
}
