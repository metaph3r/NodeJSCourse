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

        socket.emit('message', generateMessage('Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!`))

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.to('abc').emit('message', generateMessage(message))
        callback()
    })

    socket.on('sendLocation', (location, callback) => {
        io.emit('locationMessage', generateLocationMessage(location))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser({ id: socket.id })

        if (user)
            io.to(user.room).emit('message', generateMessage(`${user.username} has left!`))
    })
})

httpsServer.listen(port, () => {
    console.log('Server is up on port ' + port)
})