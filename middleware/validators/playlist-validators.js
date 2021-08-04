const { checkSchema } = require("express-validator")
const albumService = require("../../services/album-service.js")
const playlistService = require("../../services/playlist-service.js")
const ApiError = require("../../utils/error-classes/api-error.js")

module.exports.playlistValidationRules = function (isPatch = false) {
   return checkSchema({
      name: {
         optional: isPatch,
         trim: true,
         isEmpty: {
            negated: true,
            errorMessage: "no playlist name entered",
         },
         isLength: {
            options: { max: 30 },
            errorMessage: "playlist name cannot be longer than 30 characters",
         },
      },
      creator: {
         optional: isPatch,
         exists: {
            negated: isPatch,
            errorMessage: isPatch
               ? "cannot update creator id on this route"
               : "no creator id entered",
            bail: true,
         },
         trim: true,
         isEmpty: {
            negated: true,
            errorMessage: "no creator id entered",
            bail: true,
         },
         isLength: {
            options: 24,
            errorMessage: "invalid creator id entered",
            bail: true,
         },
         isHexadecimal: {
            errorMessage: "creator id can only contain hex characters",
            bail: true,
         },
         custom: {
            options: checkCreatorIdMatchesUser,
         },
      },
      creatorUserName: {
         optional: isPatch,
         trim: true,
         custom: {
            options: checkCreatorUsernameMatchesUser,
         },
      },
      albums: {
         optional: true,
         isArray: {
            errorMessage: "albums must be an array",
            bail: true,
         },
      },
      "albums.*": {
         isEmpty: {
            negated: true,
            errorMessage: "empty album id entered",
            bail: true,
         },
         isLength: {
            options: 24,
            errorMessage: "invalid album id entered",
            bail: true,
         },
         isHexadecimal: {
            errorMessage: "album id can only contain hex characters",
            bail: true,
         },
         custom: {
            options: checkAlbumExists,
         },
      },
      isPrivate: {
         optional: isPatch,
         isBoolean: {
            errorMessage: "isPrivate must be a boolean",
         },
      },
   })
}

module.exports.validatePlaylistIdReqParam = async function (req, res, next) {
   const playlistId = req.params.playlistId
   try {
      const playlist = await playlistService.getPlaylistById(playlistId)
      if (playlist == null) {
         throw new ApiError(404, "that playlist does not exist")
      }
      req.playlist = playlist
      next()
   } catch (err) {
      next(err)
   }
}

module.exports.validateUserOwnsPlaylist = async function (req, res, next) {
   try {
      const userId = req.user._id
      const playlist = req.playlist
      if (playlist.creator != userId) {
         throw new ApiError(403, "you are not authorized for that playlist")
      }
      next()
   } catch (err) {
      next(err)
   }
}

async function checkAlbumExists(value, { req }) {
   const foundAlbum = await albumService.getAlbumById(value)
   if (foundAlbum == null) {
      throw new Error("album id does not exist")
   }
}

function checkCreatorIdMatchesUser(value, { req }) {
   return new Promise((resolve, reject) => {
      if (value != req.user._id) {
         reject("you can only create a playlist for yourself")
      }
      resolve()
   })
}

function checkCreatorUsernameMatchesUser(value, { req }) {
   return new Promise((resolve, reject) => {
      if (value != req.user.userName) {
         reject("username does not match creator name")
      }
      resolve()
   })
}
