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
io.on('connection', () => {
    console.log('New WebSocket connection')
})
server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})


console.log("Node JS");