const express = require('express')
const cors = require('cors')

// Controllers
const userController = require('./controllers/users')
const roomController = require('./controllers/rooms')

// Init express
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Middleware Routes
app.use('/api/users', userController)
app.use('/api/rooms', roomController)


// Set Port
app.set('port', process.env.PORT || 4000)

// Connect on 'port'
app.listen(app.get('port'), () => {
  console.log('listening on port '+ app.get('port'))
})