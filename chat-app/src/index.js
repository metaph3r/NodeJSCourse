require('dotenv').config()

const PORT = process.env.PORT || 3000
const REDIS_HOST = process.env.REDIS_HOST || 'redis'
const REDIS_PORT = process.env.REDIS_PORT || 6379

const socketio = require('socket.io')
const { createAdapter } = require('@socket.io/redis-adapter')
const { createClient } = require('redis')

const path = require('path')
const http = require('http')
const express = require('express')
const Filter = require('bad-words')

const app = express()
const httpServer = http.createServer(app)
const publicPath = path.join(__dirname, '../public')

const io = socketio(httpServer)
const pubClient = createClient({host: REDIS_HOST, port: REDIS_PORT})
const subClient = pubClient.duplicate()
io.adapter(createAdapter(pubClient, subClient))

const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.on('join', ({ username, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, username, room })

        if (error)
            return callback(error)

        socket.join(user.room)

        socket.emit('message', generateMessage('Admin', 'Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        // get room the user is currently in

        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback()
    })

    socket.on('sendLocation', (location, callback) => {
        // get room the user is currently in
        const user = getUser(socket.id)

        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, location))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser({ id: socket.id })

        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
})

httpServer.listen(PORT, () => {
    console.log('Server is up on port ' + PORT)
})