const { checkSchema } = require("express-validator")
const albumService = require("../../services/album-service.js")
const artistService = require("../../services/artist-service.js")
const ApiError = require("../../utils/error-classes/api-error.js")

async function validateArtistIdReqBody(value, { req }) {
   const foundArtist = await artistService.getArtistById(value)
   if (foundArtist == null) {
      throw new Error("artist id does not exist")
   }
   req.body.artistName = foundArtist.name
}

module.exports.albumValidationRules = function (isPatch = false) {
   return checkSchema({
      name: {
         optional: isPatch,
         isEmpty: {
            negated: true,
            errorMessage: "no album name entered",
            bail: true,
         },
      },
      releaseDate: {
         optional: isPatch,
         isDate: true,
         errorMessage: "invalid release date entered",
      },
      albumLength: {
         optional: isPatch,
         matches: {
            options: /^(?:\d{1,2}:)?\d{1,2}:\d{2}$/,
         },
         errorMessage: "invalid album length entered",
      },
      artist: {
         optional: isPatch,
         isEmpty: {
            negated: true,
            errorMessage: "no artist id entered",
            bail: true,
         },
         isLength: {
            options: 24,
            errorMessage: "invalid artist id entered",
            bail: true,
         },
         isHexadecimal: {
            errorMessage: "artist id can only contain hex characters",
            bail: true,
         },
         custom: {
            options: validateArtistIdReqBody,
         },
      },
   })
}

module.exports.validateAlbumIdReqParam = async function (req, res, next) {
   try {
      const albumId = req.params.albumId
      let album = await albumService.getAlbumById(albumId)
      if (album == null) {
         throw new ApiError(404, "that album does not exist")
      }
      req.album = album
      next()
   } catch (err) {
      next(err)
   }
}
