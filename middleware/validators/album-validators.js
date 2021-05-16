const { checkSchema } = require("express-validator")
const artistService = require("../../services/artist-service.js")

module.exports.albumValidationRules = function () {
   return checkSchema({
      name: {
         exists: true,
         isEmpty: false,
         errorMessage: "invalid album name entered",
      },
      releaseDate: {
         isDate: true,
         errorMessage: "invalid release date entered",
      },
      albumLength: {
         matches: {
            options: /^(?:\d{1,2}:)?\d{1,2}:\d{2}$/,
         },
         errorMessage: "invalid album length entered",
      },
      artist: {
         exists: {
            errorMessage: "no artist id entered",
            bail: true,
         },
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
         custom: {
            options: async (value, { req }) => {
               let foundArtist = await artistService.getArtistById(value)
               if (foundArtist == null) {
                  throw new Error("artist id does not exist")
               }
            },
         },
      },
   })
}
