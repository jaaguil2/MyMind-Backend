const express = require('express')
const User = require('../models/User')
const { handleValidateId, handleRecordExists } = require('../middleware/custom_errors')

const router = express.Router()

// SIGN UP
// POST /api/signup
router.post('/signup', (req, res, next) => { 
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next)
});

// SIGN IN
// POST /api/signin
router.post('/signin', (req, res, next) => { })

module.exports = router