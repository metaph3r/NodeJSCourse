const socket = io()

socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#send').addEventListener('click', () => {
    const message = document.querySelector('#message').value
    socket.emit('sendMessage', message)
})

document.querySelector('#location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not support by your browser.')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })
})