const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/03c5aad23649cbc65143c286189eb211/' + latitude + ',' + longitude + '?units=ca'

    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback(body.error)
        } else {
            callback(undefined, {
                forecast: body.daily.data[0].summary +
                    ' It is ' + body.currently.temperature + ' degrees out and a '
                    + body.currently.precipProbability * 100 + ' % chance of rain.'
                    + ' The expected highest temperature for today is ' + body.daily.data[0].temperatureHigh
                    + ' degrees and the lowest is ' + body.daily.data[0].temperatureLow + ' degrees.'
            })
        }
    })
}

module.exports = forecast