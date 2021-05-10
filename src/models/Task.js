const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
    owner: {
        type: String,
        required: true,
        ref: 'User'
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