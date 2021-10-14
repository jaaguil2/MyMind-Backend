const express = require('express')
const User = require('../models/User')
const { handleValidateId, handleRecordExists } = require('../middleware/custom_errors')

const router = express.Router()

// INDEX
// GET api/user
router.get('/', (req, res, next) => {
  User.find()
    .then(users => res.json(users))
    .catch(next)
})

// SHOW
// GET api/user/5a7db6c74d55bc51bdf39793
router.get('/:id', handleValidateId, (req, res, next) => {
  User.findById(req.params.id)
    .then(handleRecordExists)
    .then(user => res.json(user))
    .catch(next)
})

// CREATE
// POST api/user
router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next)
})

// UPDATE
// PUT api/user/5a7db6c74d55bc51bdf39793
router.put('/:id', handleValidateId, (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.params.id }, 
    req.body, 
    { new: true }
  )
    .then(handleRecordExists)
    .then(user => res.json(user))
    .catch(next)
})

// DESTROY
// DELETE api/user/5a7db6c74d55bc51bdf39793
router.delete('/:id', handleValidateId, (req, res, next) => {
  User.findOneAndDelete({ _id: req.params.id})
    .then(handleRecordExists)
    .then(user => res.sendStatus(204))
    .catch(next)
})

module.exports = router