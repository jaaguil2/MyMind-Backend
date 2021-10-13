const mongoose = require('../db/connection')

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
}, {timestamps: true})

module.exports = mongoose.model('Room', roomSchema)
