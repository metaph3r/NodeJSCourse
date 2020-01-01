require('dotenv').config()

const MONGODB_USERNAME = encodeURIComponent(process.env.MONGODB_USERNAME)
const MONGODB_PASSWORD = encodeURIComponent(process.env.MONGODB_PASSWORD)

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://'
    + MONGODB_USERNAME + ':' + MONGODB_PASSWORD
    + '@85.214.129.146:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) throw error

    const db = client.db(databaseName)

    // db.collection('users').deleteMany({
    //     age: 27
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.error(error)
    // })

    db.collection('tasks').deleteOne({
        description: "Learn Node.js"
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.error(error)
    })
})