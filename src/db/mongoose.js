const mongoose = require('mongoose')

mongoose.connect('mongodb://taskadmin:L%40wsofP0wer@cluster0-shard-00-00.qbqwi.mongodb.net:27017,cluster0-shard-00-01.qbqwi.mongodb.net:27017,cluster0-shard-00-02.qbqwi.mongodb.net:27017/task-database?ssl=true&replicaSet=atlas-116hgr-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})