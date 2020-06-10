const fs = require('fs')
const path = require('path')
const https = require('https')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const privateKey = fs.readFileSync('ssl/key.pem', 'utf8')
const certificate = fs.readFileSync('ssl/cert.pem', 'utf8')
const credentials = { key: privateKey, cert: certificate }

const app = express()
const httpsServer = https.createServer(credentials, app)
const io = socketio(httpsServer)

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public')

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

        if (user)
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`))
    })
})

httpsServer.listen(port, () => {
    console.log('Server is up on port ' + port)
})