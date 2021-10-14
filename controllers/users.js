const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')

const router = express.Router()

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
  .then(user => res.status(201).json(user))
  .catch(next)
})

// SIGN IN
// POST /api/signin
router.post('/signin', (req, res, next) => { })

module.exports = router