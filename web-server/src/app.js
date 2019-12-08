// core modules
const path = require('path')
// npm modules
const express = require('express')

const app = express()

// define paths for Express configuration
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../views')

// Set up Handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Set up static directory to serve
app.use(express.static(publicPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Silvio Glöckner'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Silvio Glöckner'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Let me help you'
    })
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