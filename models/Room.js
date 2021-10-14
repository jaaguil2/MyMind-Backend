const mongoose = require('../db/connection')

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  thoughts: String,
  links: [{
    type: mongoose.ObjectId,
    ref: 'Room'
  }]
}, {timestamps: true})

module.exports = mongoose.model('Room', roomSchema)
