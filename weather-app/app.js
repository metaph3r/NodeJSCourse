const request = require('request')

const url = 'https://api.darksky.net/forecast/03c5aad23649cbc65143c286189eb211/51.0492,13.7383?units=ca'

request({
    url: url,
    json: true
}, (error, response, body) => {
    if (error) {
        console.log(error)
    } else {
        const temperature = body.currently.temperature
        const precipitation = body.currently.precipProbability

        console.log('It is currently ' + temperature + ' degrees out. There is a ' + precipitation + '% probability of rain.')
    }
})