const { checkSchema } = require("express-validator")
const artistService = require("../../services/artist-service.js")
const ApiError = require("../../utils/error-classes/api-error.js")

module.exports.artistValidationRules = function (isPatch = false) {
   return checkSchema({
      name: {
         optional: isPatch,
         trim: true,
         isEmpty: {
            negated: true,
            errorMessage: "artist name cannot be empty",
         },
         isLength: {
            options: { max: 70 },
            errorMessage: "artist name cannot be longer than 70 characters",
         },
      },
   })
}

module.exports.validateArtistIdReqParam = async function (req, res, next) {
   try {
      let artistId = req.params.artistId
      let artist = await artistService.getArtistById(artistId)
      if (artist == null) {
         throw new ApiError(404, "that artist does not exist")
      }
      req.artist = artist
      next()
   } catch (err) {
      next(err)
   }
}
