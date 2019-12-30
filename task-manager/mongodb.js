require('dotenv').config()

const MONGODB_USERNAME = encodeURIComponent(process.env.MONGODB_USERNAME)
const MONGODB_PASSWORD = encodeURIComponent(process.env.MONGODB_PASSWORD)

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://'
    + MONGODB_USERNAME + ':' + MONGODB_PASSWORD
    + '@127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) throw error

    const db = client.db(databaseName)

    const upgradePromise = db.collection('users').updateOne({
        _id: new ObjectID("")
    }, {
        $set: {
            name: 'Mike'
        }
    })
})