module.exports = function (err, req, res, next) {
   console.log(`in error handling middleware: ${err}`)
   if (err.code != null && err.code === 11000) {
      return res.status(409).json("duplicate key error")
   }
   res.status(500).end()
}
