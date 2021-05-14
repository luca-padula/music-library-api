const passport = require("passport")
const passportJwt = require("passport-jwt")
const jwtSecret = require("./jwt-config.js")

const ExtractJwt = passportJwt.ExtractJwt
const JwtStrategy = passportJwt.Strategy
const jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt")
const secretOrKey = jwtSecret
const jwtOptions = { jwtFromRequest, secretOrKey }
const strategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
   console.log("payload: ", jwtPayload)
   if (jwtPayload) {
      return next(null, {
         _id: jwtPayload._id,
         userName: jwtPayload.userName,
      })
   }
   next(null, false)
})

passport.use(strategy)
