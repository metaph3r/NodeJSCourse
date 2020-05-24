const socket = io()

socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#send').addEventListener('click', () => {
    const message = document.querySelector('#message').value
    socket.emit('sendMessage', message)
})