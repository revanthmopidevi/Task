const mongoose = require('mongoose')

const mongo_url = 'mongodb://taskadmin:L%40wsofP0wer@cluster0-shard-00-00.qbqwi.mongodb.net:27017,cluster0-shard-00-01.qbqwi.mongodb.net:27017,cluster0-shard-00-02.qbqwi.mongodb.net:27017/task-database?ssl=true&replicaSet=atlas-116hgr-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})