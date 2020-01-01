require('dotenv').config()

var mongoose = require('mongoose')

const MONGODB_USERNAME = encodeURIComponent(process.env.MONGODB_USERNAME)
const MONGODB_PASSWORD = encodeURIComponent(process.env.MONGODB_PASSWORD)

const connectionURL = 'mongodb://' + MONGODB_USERNAME + ':' + MONGODB_PASSWORD + '@85.214.129.146:27017/task-manager-api?authSource=admin'

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task = new Task({
    description: "Learn NodeJS",
    completed: false
})

task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.error(error)
})

// const me = new User({
//     name: 'Silvio Glöckner',
//     age: 40
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.error(error)
// })