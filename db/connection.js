const mongoose = require('mongoose')

const MONGODBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + 'MyMind';

mongoose
  .connect(MONGODBURI)
  .then((instance) =>
    console.log(`Connected to db: ${instance.connections[0].name}`)
  )
  .catch((error) => console.log('Connection failed!!!', error));

module.exports = mongoose