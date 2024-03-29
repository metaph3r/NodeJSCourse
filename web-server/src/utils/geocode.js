const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWV0YXBoM3IiLCJhIjoiY2szc2R0ZjZxMDQwYTNkbzEzOTdrc3AyaSJ9.Ty1SQFwFJbcbd8cSTR6ThA&limit=1'

    request({
        url,
        json: true
    }, (error, response, body) => {
        if (error) callback('Unable to connect to location service!', undefined)
        else if (body.features.length === 0) callback('Unable to find location!', undefined)
        else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode