const request = require('request-promise')

const forecast = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
        const url = 'https://api.darksky.net/forecast/03c5aad23649cbc65143c286189eb211/' + latitude + ',' + longitude + '?units=ca'

        request({
            url,
            json: true
        }).then((body) => {
            if (body.error) {
                reject(body.error)
            } else {
                resolve({
                    summary: body.daily.data[0].summary,
                    temperature: body.currently.temperature,
                    precipitation: body.currently.precipProbability
                })
            }
        }).catch((error) => {
            reject(error)
        })
    })
}

module.exports = forecast