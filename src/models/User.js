const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./Task')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase:true,
        unique: true,
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
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address.")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: "_id",
    foreignField: "owner"
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ username: user.username}, 'secret_string')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.getPublicProfile = function () {
    const user = this
    const userProfile = user.toObject()

    delete userProfile.password
    delete userProfile.tokens

    return userProfile
}

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({username: username})
    
    if (!user) {
        throw new Error("Wrong Username or Password.")
    }
    const passwordOk = await bcrypt.compare(password, user.password)
    if (!passwordOk) {
        throw new Error("Wrong Username or Password.")
    }

    return user
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({owner: user._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User