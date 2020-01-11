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
}, (error) => {
    if(error) console.error(error.message)
    else console.log('Login to MongoDB successful')
})