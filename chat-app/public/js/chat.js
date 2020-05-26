const socket = io()

// Elements
const $messageSendButton = document.querySelector('#send')
const $messageInputField = document.querySelector('#message')
const $sendLocationButton = document.querySelector('#location')

socket.on('message', (message) => {
    console.log(message)
})

$messageSendButton.addEventListener('click', () => {
    $messageSendButton.setAttribute('disabled', 'disabled')

    const message = $messageInputField.value
    socket.emit('sendMessage', message, (error) => {
        $messageSendButton.removeAttribute('disabled')
        $messageInputField.value = ''
        $messageInputField.focus()

        if (error) {
            console.log(error)
        }

        console.log('Message delivered!')
    })
})

$sendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not support by your browser.')
    }

    $sendLocationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $sendLocationButton.removeAttribute('disabled')
            console.log('Location shared!')
        })
    })
})