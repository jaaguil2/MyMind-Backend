const express = require('express')
const Room = require('../models/Room')
const { handleValidateId, handleRecordExists } = require('../middleware/custom_errors')

const router = express.Router()

// INDEX
// GET api/room
router.get('/', (req, res, next) => {
  Room.find()
  .populate('owner')
  .then(rooms => res.json(rooms))
  .catch(next)
})

// SHOW
// GET api/room/5a7db6c74d55bc51bdf39793
router.get('/:id', handleValidateId, (req, res, next) => {
  Room.findById(req.params.id)
    .then(handleRecordExists)
    .populate('owner')
    .then(room => res.json(room))
    .catch(next)
})

// CREATE
// POST api/room
router.post('/', (req, res, next) => {
  Room.create(req.body)
    .then(room => res.status(201).json(room))
    .catch(next)
})

// UPDATE
// PUT api/room/5a7db6c74d55bc51bdf39793
router.put('/:id', handleValidateId, (req, res, next) => {
  Room.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  )
    .then(handleRecordExists)
    .then(room => res.json(room))
    .catch(next)
})

// DESTROY
// DELETE api/room/5a7db6c74d55bc51bdf39793
router.delete('/:id', handleValidateId, (req, res, next) => {
  Room.findOneAndDelete({ _id: req.params.id })
    .then(handleRecordExists)
    .then(room => res.sendStatus(204))
    .catch(next)
})

module.exports = router