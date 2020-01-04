require('dotenv').config()

const mongoose = require('mongoose')

const connectionURL = 'mongodb://'
    + encodeURIComponent(process.env.MONGODB_USERNAME) + ':' 
    + encodeURIComponent(process.env.MONGODB_PASSWORD) + '@'
    + process.env.MONGODB_HOST + ':' + process.env.MONGODB_PORT
    + '/task-manager-api?authSource=admin'

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})