const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// define paths for Express configuration
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up Handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicPath))

const name = 'Silvio Glöckner'

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: name
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: name
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Let me help you',
        name: name
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Cloudy with chance of rain',
        location: 'Radebeul'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 page not found',
        message: 'Help page not found.',
        name
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page not found',
        message: 'Page not found.',
        name
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})