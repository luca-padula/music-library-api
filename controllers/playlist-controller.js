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

module.exports.updatePlaylist = async function (playlistId, playlistData) {
   const fieldsToUpdate = Object.keys(playlistData)
   if (fieldsToUpdate.length == 0) {
      throw new ApiError(422, "no album data given to update")
   }
   return await playlistService.updatePlaylistById(playlistId, playlistData)
}

module.exports.deletePlaylist = async function (playlistId) {
   return await playlistService.deletePlaylistById(playlistId)
}

function albumIsinPlaylist(albumId, playlist) {
   const foundAlbum = playlist.albums.find((album) => album == albumId)
   return foundAlbum != null
}

function addAlbumToArray(albumArr, albumId) {
   const newAlbumArr = [...albumArr, albumId]
   return newAlbumArr
}

module.exports.addAlbumToPlaylist = async function (playlistId, albumId) {
   const playlistDocument = await playlistService.getPlaylistByIdFullDoc(
      playlistId
   )
   if (albumIsinPlaylist(albumId, playlistDocument)) {
      throw new ApiError(409, "album is already in playlist")
   }
   const newAlbumArr = addAlbumToArray(playlistDocument.albums, albumId)
   playlistDocument.albums = newAlbumArr
   return await playlistService.savePlaylist(playlistDocument)
}

function deleteAlbumFromArray(albumArray, albumIdToDelete) {
   const indexToDelete = albumArray.indexOf(albumIdToDelete)
   albumArray.splice(indexToDelete, 1)
   return albumArray
}

module.exports.removeAlbumFromPlaylist = async function (playlistId, albumId) {
   const playlistDocument = await playlistService.getPlaylistByIdFullDoc(
      playlistId
   )
   if (!albumIsinPlaylist(albumId, playlistDocument)) {
      throw new ApiError(422, "album is not in that playlist")
   }
   deleteAlbumFromArray(playlistDocument.albums, albumId)
   return await playlistService.savePlaylist(playlistDocument)
}
