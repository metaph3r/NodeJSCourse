const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/03c5aad23649cbc65143c286189eb211/' + latitude + ',' + longitude + '?units=ca'

    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (response.body.error) {
            callback(response.body.error)
        } else {
            callback(undefined, {
                summary: response.body.daily.data[0].summary,
                temperature: response.body.currently.temperature,
                precipitation: response.body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast