const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

if (location = process.argv[2]) {
    geocode(location)
        .then(({ location, latitude, longitude } = {}) => {
            return forecast(latitude, longitude)
        })
        .then(({ summary, temperature, precipitation } = {}) => {
            console.log('Forecast for', location)
            console.log(summary,
                'It is currently ' + temperature + ' degrees out.',
                'There is a ' + precipitation + '% chance of rain.')
        })
        .catch((reject) => {
            console.log(reject)
        })
} else console.log('Please provide a location.')