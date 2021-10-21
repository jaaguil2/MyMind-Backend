const passport = require('passport')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { BadCredentialsError } = require('../middleware/custom_errors')

const secret = "none"
const { Strategy, ExtractJwt } = require('passport-jwt')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}

const User = require('../models/User')

const strategy = new Strategy(opts, function (jwt_payload, done) {
  User.findById(jwt_payload.id)
    .then(user => done(null, user))
    .catch(err => done(err))
})

passport.use(strategy)
passport.initialize()

const requireToken = passport.authenticate('jwt', { session: false })

const createUserToken = (req, user) => {
  if (
    !user ||
    !req.body.password ||
    !bcrypt.compareSync(req.body.password, user.password)
  ) {
    throw new BadCredentialsError()
  }
  return jwt.sign({ id: user._id }, secret, { expiresIn: 36000})
}

module.exports = {
  requireToken,
  createUserToken
}
