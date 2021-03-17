const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    username: {
        type: String,
        lowercase:true,
        trim:true,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("Password too weak.")
            }
        }
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error(" Age cannot be negative.")
            } 
        }
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address.")
            }
        }
    }
})

module.exports = User