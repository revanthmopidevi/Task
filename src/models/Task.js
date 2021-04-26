const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
    username: {
        type: String,
        required: true,
        trim : true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        required: false,
        default: false
    }
})

module.exports = Task