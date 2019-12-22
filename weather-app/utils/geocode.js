const request = require('request-promise')

const geocode = (address) => {
    return new Promise((resolve, reject) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWV0YXBoM3IiLCJhIjoiY2szc2R0ZjZxMDQwYTNkbzEzOTdrc3AyaSJ9.Ty1SQFwFJbcbd8cSTR6ThA&limit=1'

        request({
            url,
            json: true
        }).then((body) => {
            if (body.features.length === 0) {
                reject('Unable to find location!')
            } else {
                resolve({
                    location: body.features[0].place_name,
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0]
                })
            }
        }).catch((error) => {
            reject(error)
        })
    })
}

module.exports = geocode