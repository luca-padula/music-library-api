const playlistService = require("../services/playlist-service.js")

module.exports.getAllPlaylists = async function () {
   return await playlistService.getAllPlaylists()
}

module.exports.getPlaylist = async function (playlistId) {
   return await playlistService.getPlaylistById(playlistId)
}

module.exports.getPlaylistsByUser = async function (userId) {
   return await playlistService.getPlaylistsByUser(userId)
}

module.exports.addPlaylist = async function (playlistData) {
   return await playlistService.createPlaylist(playlistData)
}
