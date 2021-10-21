const express = require('express')
const bcrypt = require('bcrypt')
const { createUserToken } = require('../middleware/auth')

// Models
const User = require('../models/User')
const Room = require('../models/Room')

const router = express.Router()

// GET
// Basic route to know api is up
router.get('/', (req, res, next) => {
  res.json("Welcome to MyMind API")
})

// SIGN UP
// POST /api/signup
router.post('/signup', (req, res, next) => { 
  bcrypt
    .hash(req.body.password, 11)
    .then(hash => ({
      name: req.body.name,
      password: hash,
      userName: req.body.userName,
      email: req.body.email
    }))
  .then(user => User.create(user))
  .then(user => {
    Room.create({ name: "home", owner: user._id })
    return user
  })
  .then(user => ({ token: createUserToken(req, user), id: user._id }))
  .then(json => res.json(json))
  .catch(next)
})

// SIGN IN
// POST /api/signin
router.post('/signin', (req, res, next) => {
  User.findOne({ userName: req.body.userName})
    .then(user => ({ token: createUserToken(req, user), id: user._id}))
    .then(json => res.json(json))
    .catch(next)
})

module.exports = router