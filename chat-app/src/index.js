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
const logger = require('./logger')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const publicPath = path.join(__dirname, '../public')
const app = express()
app.use(express.static(publicPath))
const httpServer = http.createServer(app)
const io = socketio(httpServer)

const pubClient = createClient({ host: REDIS_HOST, port: REDIS_PORT })
pubClient.on('ready', () => {
    logger.info('Redis is connected')
})
pubClient.on('error', (error) => {
    logger.error(error)
})
const subClient = pubClient.duplicate()
io.adapter(createAdapter(pubClient, subClient))

io.on('error', (error) => {
    logger.error(error)
})

io.on('connection', (socket) => {
    logger.info(`New WebSocket connection from ${socket.handshake.address}`)

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

    socket.on('error', (error) => {
        logger.error(error)
    })
})

httpServer.listen(PORT, () => {
    logger.info('Server is up on port ' + PORT)
})