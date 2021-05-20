const mongoose = require("mongoose")
const Schema = mongoose.Schema

const albumSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
      releaseDate: {
         type: Date,
         required: true,
      },
      albumLength: {
         type: String,
         required: true,
      },
      artist: {
         type: Schema.Types.ObjectId,
         ref: "Artist",
         index: true,
      },
      artistName: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
)

const Album = mongoose.model("Album", albumSchema)

module.exports = Album
