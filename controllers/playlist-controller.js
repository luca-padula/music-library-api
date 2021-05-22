const playlistService = require("../services/playlist-service.js")
const ApiError = require("../utils/error-classes/api-error.js")

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

module.exports.deletePlaylist = async function (playlistId) {
   return await playlistService.deletePlaylistById(playlistId)
}

function albumIsinPlaylist(albumId, playlist) {
   const foundAlbum = playlist.albums.find((album) => album == albumId)
   return foundAlbum != null
}

module.exports.addAlbumToPlaylist = async function (playlistId, albumId) {
   const playlistDocument = await playlistService.getPlaylistByIdFullDoc(
      playlistId
   )
   if (albumIsinPlaylist(albumId, playlistDocument)) {
      throw new ApiError(409, "album is already in playlist")
   }
   return await playlistService.addAlbumToPlaylist(albumId, playlistDocument)
}

module.exports.removeAlbumFromPlaylist = async function (playlistId, albumId) {
   const playlistDocument = await playlistService.getPlaylistByIdFullDoc(
      playlistId
   )
   if (!albumIsinPlaylist(albumId, playlistDocument)) {
      throw new ApiError(422, "album is not in that playlist")
   }
   return await playlistService.removeAlbumFromPlaylist(
      albumId,
      playlistDocument
   )
}
