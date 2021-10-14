const express = require('express')
const Room = require('../models/Room')

const router = express.Router()

// INDEX
// GET api/room
router.get('/', (req, res) => {
  Room.find()
  .populate('owner')
    .then((rooms) => res.json(rooms))
});

// SHOW
// GET api/room/5a7db6c74d55bc51bdf39793
router.get('/:id', (req, res) => {
  Room.findById(req.params.id)
    .populate('owner')
    .then((room) => res.json(room))
});

// CREATE
// POST api/room
router.post('/', (req, res) => {
  Room.create(req.body)
    .then((room) => res.json(room))
});

// UPDATE
// PUT api/room/5a7db6c74d55bc51bdf39793
router.put('/:id', (req, res) => {
  Room.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  )
    .then((room) => res.json(room))
});

// DESTROY
// DELETE api/room/5a7db6c74d55bc51bdf39793
router.delete('/:id', (req, res) => {
  Room.findOneAndDelete({ _id: req.params.id })
    .then((job) => res.json(job))
})

module.exports = router