const Album = require("../models/album.js")

module.exports.createAlbum = async function (albumData) {
   let newAlbum = new Album(albumData)
   return await newAlbum.save()
}
