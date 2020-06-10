const generateMessage = (username, message) => {
    return {
        username,
        message,
        timestamp: new Date().getTime()
    }
}

const generateLocationMessage = (username, location) => {
    return {
        username,
        url: `https://google.de/maps?q=${location.latitude},${location.longitude}`,
        timestamp: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}