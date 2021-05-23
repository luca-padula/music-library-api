const mongoose = require("mongoose")
const Schema = mongoose.Schema

const playlistSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
         default: "Favourites",
      },
      creator: { type: Schema.Types.ObjectId, ref: "User", index: true },
      creatorUserName: {
         type: String,
         required: true,
      },
      albums: [{ type: Schema.Types.ObjectId, ref: "Album" }],
      isPrivate: { type: Boolean, required: true },
   },
   { timestamps: true }
)

const Playlist = mongoose.model("Playlist", playlistSchema)

module.exports = Playlist
