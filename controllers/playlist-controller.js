const playlistService = require("../services/playlist-service.js")

module.exports.getAllPlaylists = async function () {
   return await playlistService.getAllPlaylists()
}

module.exports.addPlaylist = async function (playlistData) {
   return await playlistService.createPlaylist(playlistData)
}
