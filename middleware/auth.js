const passport = require('passport')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

const { Strategy, ExtractJwt } = require('passport-jwt')

const opts = {
  jwtFormRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}