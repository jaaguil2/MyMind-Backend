const mongoose = require('mongoose')
const Room = require('./tweet.js')

const mongoURI = 'mongodb://localhost:27017/' + 'rooms'
const db = mongoose.connection

mongoose.connection(mongoURI)

mongoose.connect(mongoURI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, () => {
  console.log('Connection established.');
});

db.on('error', (err) => console.log("Mongo Error:", err.message))
db.on('connected', () => console.log('mongo connected: ', mongoURI))
db.on('disconnected', () => console.log('mongo disconnected'))

