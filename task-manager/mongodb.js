require('dotenv').config()

const MONGODB_USERNAME = process.env.MONGODB_USERNAME
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://'
    + MONGODB_USERNAME + ':' + MONGODB_PASSWORD
    + '@127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, {
    useNewUrlParser: true
}, (error, client) => {
    if (error) throw error

    const db = client.db(databaseName)

    db.collection('users').insertOne({
        name: 'Silvio',
        age: 40
    })
})