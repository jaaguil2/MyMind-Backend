const User = require('../models/User')

const seedData = require('./seeds.json')

User.deleteMany()
.then(() => User.insertMany(seedData))
.then(console.log)
.catch(console.error)
.finally(process.exit)