const request = require('request')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const location = process.argv[2]

if (location) {
    geocode(location, (error, response) => {
        if (error) return console.log(error)

        forecast(response.latitude, response.longitude, (error, forecastData) => {
            if (error) return console.log(error)

            console.log('Forecast for', response.location)
            console.log(forecastData.summary,
                'It is currently ' + forecastData.temperature + ' degrees out.',
                'There is a ' + forecastData.precipitation + '% chance or rain.')
        })
    })
} else console.log('Please provide a location.')