const socket = io()

// Elements
const $messageSendButton = document.querySelector('#send')
const $messageInputField = document.querySelector('#message')
const $sendLocationButton = document.querySelector('#location')
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML

// Chat message event
socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        message
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

// Location message event
socket.on('locationMessage', (url) => {
    const html = Mustache.render(locationMessageTemplate, { url })
    $messages.insertAdjacentHTML('beforeend', html)
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