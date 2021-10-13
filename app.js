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
  console.log('the connection with mongo is established');
});