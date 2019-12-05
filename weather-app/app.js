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

        console.log(body.daily.data[0].summary + ' It is currently '
            + temperature + ' degrees out. There is a '
            + precipitation + '% chance of rain.\n')
    }
})

const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Dresden.json?access_token=pk.eyJ1IjoibWV0YXBoM3IiLCJhIjoiY2szc2R0ZjZxMDQwYTNkbzEzOTdrc3AyaSJ9.Ty1SQFwFJbcbd8cSTR6ThA&limit=1'

request({
    url: mapBoxUrl,
    json: true
}, (error, response, body) => {
    const feature = body.features[0] // get the feature information for the requested search term
    const feature_name = feature.place_name
    const lat = feature.center[1]
    const lon = feature.center[0]

    console.log('Coordinates for ' + feature_name)
    console.log('Latitude: ' + lat + ' Longitude: ' + lon + '\n')
})