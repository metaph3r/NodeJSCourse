const generateMessage = (message) => {
    return {
        message,
        timestamp: new Date().getTime()
    }
}

const generateLocationMessage = (location) => {
    return {
        url: `https://google.de/maps?q=${location.latitude},${location.longitude}`,
        timestamp: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}