const express = require('express')
const Room = require('../models/Room')

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
router.get('/:id', (req, res, next) => {
  Room.findById(req.params.id)
    .populate('owner')
    .then(room => {
      if (!room) {
        res.sendStatus(404)
      } else {
        res.json(room)
      }
    })
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
router.put('/:id', (req, res, next) => {
  Room.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  )
    .then(room => {
      if (!room) {
        res.sendStatus(404)
      } else {
        res.json(room)
      }
    })
    .catch(next)
})

// DESTROY
// DELETE api/room/5a7db6c74d55bc51bdf39793
router.delete('/:id', (req, res, next) => {
  Room.findOneAndDelete({ _id: req.params.id })
    .then(room => {
      if (!room) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch(next)
})

module.exports = router