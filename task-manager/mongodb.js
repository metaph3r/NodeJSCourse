require('dotenv').config()

const MONGODB_USERNAME = encodeURIComponent(process.env.MONGODB_USERNAME)
const MONGODB_PASSWORD = encodeURIComponent(process.env.MONGODB_PASSWORD)

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://'
    + MONGODB_USERNAME + ':' + MONGODB_PASSWORD
    + '@127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) throw error

    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: 'Silvio',
    //     age: 40
    // }, (error, result) => {
    //     if (error) throw error

    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     }, {
    //         name: 'Gunther',
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if (error) throw error

    //     console.log(result.ops)
    // })

    db.collection('tasks').insertMany([
        {
            description: 'Do stuff!',
            completed: false
        }, {
            description: 'Learn Node.js',
            completed: false
        }, {
            description: 'Install Ubuntu',
            completed: true
        }
    ], (error, result) => {
        if (error) throw error

        console.log(result.ops)
    })
})