// core modules
const path = require('path')
// npm modules
const express = require('express')

console.log(path.join(__dirname, '../public'))

const app = express()

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.send('<h1>Weather service</h1>')
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Cloudy with chance of rain',
        location: 'Radebeul'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})