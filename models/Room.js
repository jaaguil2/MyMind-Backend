const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
    type: mongoose.ObjectId,
    ref: 'User'
  },
  thoughts: String,
  links: [{
    type: mongoose.ObjectId,
    ref: 'Room'
  }]
}, {timestamps: True})

module.exports = mongoose.model('Room', roomSchema)
