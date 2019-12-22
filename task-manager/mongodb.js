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

    // db.collection('users').findOne({
    //     _id: new ObjectID("5dff818166afe475fc83413c")
    // }, (error, user) => {
    //     if (error) throw error

    //     console.log(user)
    // })

    // db.collection('users').find({
    //     name: 'Silvio'
    // }).toArray((error, users) => {
    //     if (error) throw error

    //     console.log(users)
    // })

    // db.collection('users').find({
    //     name: 'Silvio'
    // }).count((error, users) => {
    //     if (error) throw error

    //     console.log(users)
    // })

    db.collection('tasks').findOne({
        _id: new ObjectID("5dff7ca75ea4db6cdcfec31d")
    }, (error, task) => {
        console.log(task)
    })

    db.collection('tasks').find({
        completed: false
    }).toArray((error, tasks) => {
        console.log(tasks)
    })
})