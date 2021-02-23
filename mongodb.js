// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-app"

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database.")
    }
    const db = client.db(databaseName)

    // db.collection('tasks').insertMany([
    //     {
    //         description: "",
    //         completed: false
    //     }, {
    //         description: "Write",
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log("Unable to insert tasks.")
    //     }

    //     console.log(result.ops)
    // })

    db.collection('tasks').findOne({
        description: "Write"
    }, (error, task) => {
        if (error) {
            return console.log("Unable to fetch object.")
        }
        console.log(task)
    })
})