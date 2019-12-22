require('dotenv').config()

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

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
        title: 'Weather',
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
    const location = req.query.location

    if (!location) {
        return res.send({
            error: 'Please provide a location'
        })
    }

    geocode(location, (error, { location, latitude, longitude } = {}) => {
        if (error) return res.send({ error })

        forecast(latitude, longitude, (error, { forecast } = {}) => {
            if (error) return res.send({ error })

            return res.send({
                forecast,
                location
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
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

app.listen(port, () => {
    console.log('Server is up on port', port)
})