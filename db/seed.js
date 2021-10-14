const User = require('../models/User')
const Room = require('../models/Room')

const seedUser = require('./seedUser.json')
const seedRoom = require('./seedRoom.json')

User.deleteMany()
.then(() => User.insertMany(seedUser))
.then(() => Room.deleteMany())
.then(() => Room.insertMany(seedRoom))
.then(() => User.findOne())
.then(user => Room.findOneAndUpdate(
  { },
  { owner: user._id },
  { new: true }
))
.then(console.log)
.catch(console.error)
.finally(process.exit)
