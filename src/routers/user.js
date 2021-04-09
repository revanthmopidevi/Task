const express = require('express')
const router = new express.Router()
const User = require('../models/User')
const auth = require('../middleware/auth')


// Add user
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user: user, token: token})
    } catch (error) {
        res.status(400).send()
    }
})
// Login user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user: user, token: token})
    } catch (error) {
        res.status(400).send(error)
    }
})
// Get user
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})
// Update user by id
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({"error": "Invalid update operations."})
    }

    try {
        const user = await User.findById(req.params.id)
        /* const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }) */
        
        if (!user) {
            return res.status(404).send()
        }

        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await user.save()
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router