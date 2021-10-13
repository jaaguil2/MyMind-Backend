const express = require('express')
const User = require('../models/User')

const router = express.Router()

// INDEX
// GET api/user
router.get('/', (req, res) => { 
  User.find()
    .then((users) => res.json(users))
});

// SHOW
// GET api/user/5a7db6c74d55bc51bdf39793
router.get('/:id', (req, res) => { 
  User.findById(req.params.id)
    .then((user) => res.json(user))
});

// CREATE
// POST api/user
router.post('/', (req, res) => { 
  User.create(req.body)
    .then((user) => res.json(user))
});

// UPDATE
// PUT api/user/5a7db6c74d55bc51bdf39793
router.put('/:id', (req, res) => { 
  User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  }).then((user) => res.json(user));
});

// DESTROY
// DELETE api/user/5a7db6c74d55bc51bdf39793
router.delete('/:id', (req, res) => { 
  User.findOneAndDelete({
    _id: req.params.id,
  }).then((job) => res.json(job));
});

module.exports = router