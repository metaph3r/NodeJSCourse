const generateMessage = (message => {
    return {
        message,
        timestamp: new Date().getTime()
    }
})

module.exports = {
    generateMessage
}