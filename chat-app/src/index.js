const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.emit('message', 'Welcome!')
    socket.broadcast.emit('message', 'A new user has joined!')

    socket.on('sendMessage', (message) => {
        console.log('Client sent message', message)
        io.emit('message', message)
    })

    socket.on('sendLocation', (location) => {
        io.emit('message', `https://google.de/maps?q=${location.latitude},${location.longitude}`)
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })
})

server.listen(port, () => {
    console.log('Server is up on port ' + port)
})