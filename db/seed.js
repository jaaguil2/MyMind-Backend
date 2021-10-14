const User = require('../models/User')
const Room = require('../models/Room')

const seedUser = require('./seedUser.json')

User.deleteMany()
.then(() => User.insertMany(seedUser))
.then(() => Room.deleteMany())
.then(() => User.findOne())
.then(user => {
  return Room.create({
    name: "home",
    owner: user._id
  })
})
.then(console.log)
.catch(console.error)
.finally(process.exit)
