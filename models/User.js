const mongoose = require('../db/connection')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
}, 
{
  timestamps: true,
  id: false,
  toJSON: {
    virtuals: true,
    transfrom: (_doc, ret) => {
      delete ret.password
      return ret
    }
  }
})

module.exports = mongoose.model('User', userSchema)
