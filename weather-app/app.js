const request = require('request')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

if (location = process.argv[2]) {
    geocode(location, (error, { latitude, longitude, location }) => {
        if (error) return console.log(error)

        forecast(latitude, longitude, (error, { summary, temperature, precipitation }) => {
            if (error) return console.log(error)

            console.log('Forecast for', location)
            console.log(summary,
                'It is currently ' + temperature + ' degrees out.',
                'There is a ' + precipitation + '% chance or rain.')
        })
    })
} else console.log('Please provide a location.')