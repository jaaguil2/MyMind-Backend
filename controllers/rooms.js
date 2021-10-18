const express = require('express')
const Room = require('../models/Room')
const { 
  handleValidateId, 
  handleRecordExists,
  handleValidateOwnership
} = require('../middleware/custom_errors')
const { requireToken } = require('../middleware/auth')

const router = express.Router()

// INDEX -- NEEDED?
// GET api/room
// router.get('/', (req, res, next) => {
//   Room.find()
//   .populate('owner')
//   .then(rooms => res.json(rooms))
//   .catch(next)
// })

// SHOW
// GET api/room/:id 
router.get('/:id', (req, res, next) => {
  Room.findById(req.params.id)
    .populate('owner')
    .populate('links')
    .then(handleRecordExists)    
    .then(room => res.json(room))
    .catch(next)
})

//SHOW
// Get api/room/home/:id 
// returns home room from user id
router.get('/home/:id', (req, res, next) => {
  Room.find({ owner: `${req.params.id}`, name: "home"})
    .then(handleRecordExists)
    .then(room => res.json(room))
    .catch(next)
})

// CREATE -- NEEDED?
// POST api/room
// router.post('/', requireToken, (req, res, next) => {
//   if (req.body.name !== "home") {
//     Room.create({ ...req.body, owner: req.user._id })
//       .then(room => res.status(201).json(room))
//       .catch(next)
//   } else {
//     throw new Error("'home' is a reserved name")
//   }  
// })

// UPDATE
// PUT api/room/:id 
router.put('/:id', handleValidateId, (req, res, next) => {
  Room.findById(req.params.id)
    .then(handleRecordExists)
    .then(room => handleValidateOwnership(req, room))
    .then(room => room.set(req.body).save())
    .then(room => res.json(room))
    .catch(next)
})

// UPDATE
// PUT api/room/new/:id  - id: current room -> add new room to curr links
router.put('/new/:id', handleValidateId, (req, res, next) => {
  Room.findById(req.params.id)
    .then(handleRecordExists)
    .then(room => handleValidateOwnership(req, room))
    .then(room => {
      if (req.body.name !== "home") {
        Room.create({ name: req.body.name, owner: room.owner })
          .then(newRoom => {
            room.set({links: newRoom}).save()
          })
      } else {
        throw new Error("'home' is a reserved name")
      }
    })
    .then(room => res.json(room))
    .catch(next)
})

// DESTROY
// DELETE api/room/:id 
router.delete('/:id', handleValidateId, (req, res, next) => {
  Room.findById(req.params.id)
    .then(handleRecordExists)
    // .then(room => handleValidateOwnership(req, room))
    .then(room => {
      if (room.name !== "home") {
        room.remove()
      } else {
        throw new Error("Cannot remove 'home' node")
      }   
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router