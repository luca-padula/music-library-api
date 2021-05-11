module.exports = function (err, req, res, next) {
   console.log(`in error handling middleware: ${err}`)
   if (err.code != null && err.code === 11000) {
      return res.status(409).send(err)
   }
   res.status(500).send(err)
}
