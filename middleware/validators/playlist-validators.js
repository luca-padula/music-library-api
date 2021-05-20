const { checkSchema } = require("express-validator")
const userService = require("../../services/user-service.js")
const albumService = require("../../services/album-service.js")
const playlistService = require("../../services/playlist-service.js")
const ApiError = require("../../utils/error-classes/api-error.js")

module.exports.playlistValidationRules = function () {
   return checkSchema({
      name: {
         exists: true,
         isEmpty: false,
         errorMessage: "invalid playlist name entered",
      },
      creator: {
         exists: {
            errorMessage: "no creator id entered",
            bail: true,
         },
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
            options: async (value, { req }) => {
               if (value != req.user._id) {
                  throw new Error("you can only create a playlist for yourself")
               }
               const foundUser = await userService.getUserById(value)
               if (foundUser == null) {
                  throw new Error("user id does not exist")
               }
               if (foundUser.userName != req.body.creatorUserName) {
                  throw new Error("username does not match creator name")
               }
            },
         },
      },
      creatorUserName: {
         exists: true,
         isEmpty: false,
         errorMessage: "invalid creator username entered",
      },
      albums: {
         optional: true,
         isArray: {
            errorMessage: "invalid albums entered, please enter an array",
            bail: true,
         },
      },
      "albums.*": {
         exists: {
            errorMessage: "empty album id entered",
            bail: true,
         },
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
            options: async (value, { req }) => {
               const foundAlbum = await albumService.getAlbumById(value)
               if (foundAlbum == null) {
                  throw new Error("album id does not exist")
               }
            },
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
