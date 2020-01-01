require('dotenv').config()

var mongoose = require('mongoose')
var validator = require('validator')

const MONGODB_USERNAME = encodeURIComponent(process.env.MONGODB_USERNAME)
const MONGODB_PASSWORD = encodeURIComponent(process.env.MONGODB_PASSWORD)

const connectionURL = 'mongodb://' + MONGODB_USERNAME + ':' + MONGODB_PASSWORD + '@85.214.129.146:27017/task-manager-api?authSource=admin'

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true
})

// model for users
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    }
})

// model for tasks
const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const task = new Task({
    description: '            Do something!     '
})

task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.error(error)
})

// const me = new User({
//     name: '   Silvio  ',
//     email: '   silvio@silvio-gloeckner.de   ',
//     password: 'Password'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.error(error)
// })