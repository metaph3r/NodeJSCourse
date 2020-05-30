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

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.emit('message', 'Welcome!')
    socket.broadcast.emit('message', 'A new user has joined!')

    socket.on('sendMessage', (message, callback) => {
        console.log('Client sent message', message)

        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.emit('message', message)
        callback()
    })

    socket.on('sendLocation', (location, callback) => {
        io.emit('message', `https://google.de/maps?q=${location.latitude},${location.longitude}`)
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })
})

httpsServer.listen(port, () => {
    console.log('Server is up on port ' + port)
})