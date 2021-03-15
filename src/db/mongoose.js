const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    username: {
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
    status: {
        type: Boolean
    }
})

const me = new User({
    username: 'revanthmopidevi',
    age: 21
})

const task = new Task({
    description: "code",
    status: false
})

me.save().then((me) => {
    console.log(me)
}).catch((error) => {
    console.log(error)
})

task.save().then((task) => {
    console.log(task)
}).catch((error) => {
    console.log(error)
})