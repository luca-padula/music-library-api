const { checkSchema } = require("express-validator")
const artistService = require("../../services/artist-service.js")
const ApiError = require("../../utils/error-classes/api-error.js")

module.exports.artistValidationRules = function () {
   return checkSchema({
      name: {
         exists: {
            errorMessage: "no artist name entered",
            bail: true,
         },
         isEmpty: {
            negated: true,
            errorMessage: "artist name cannot be empty",
            bail: true,
         },
      },
   })
}

// same validation rules as for creating a new artist but all fields
// are optional since patch may not update every field
module.exports.updateArtistValidationRules = function () {
   return checkSchema({
      name: {
         optional: true,
         isEmpty: {
            negated: true,
            errorMessage: "artist name cannot be empty",
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
