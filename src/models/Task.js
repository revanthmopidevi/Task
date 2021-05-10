const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
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
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task