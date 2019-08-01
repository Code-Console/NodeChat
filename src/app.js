const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
// Create the Express application
const app = express()
// Create the HTTP server using the Express app
const server = http.createServer(app)
// Connect socket.io to the HTTP server
const io = socketio(server)
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))
// Listen for new connections to Socket.io
let count = 0
io.on('connection', (socket) => {
    console.log('New WebSocket connection')
    socket.broadcast.emit('message', 'A new user has joined!')
    socket.emit('countUpdated', count)
    socket.on('increment', () => {
        count++
        console.log('countUpdated -> '+count)
        io.emit('countUpdated', count)
    })
    socket.on('sendLocation', (coords) => {
        console.log(coords.latitude+' <- sendLocation -> '+coords.longitude)
        io.emit('message',`https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })
    socket.on('sendMessage', (message, callback) => {
        console.log('message -> '+message)
        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }
        io.emit('message', message)
        callback()
    })
     
    
})
server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})