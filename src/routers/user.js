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
        res.status(201).send({user: user.getPublicProfile(), token: token})
    } catch (error) {
        res.status(400).send()
    }
})
// Login user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user: user.getPublicProfile(), token: token})
    } catch (error) {
        res.status(400).send(error)
    }
})
// Logout user session
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})
// Logout all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})
// Get user
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user.getPublicProfile())
})
// Update user by id
router.patch('/users/update', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({"error": "Invalid update operations."})
    }

    try {
        const user = await User.findById(req.user._id)
        /* const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }) */
        
        // if (!user) {
        //     return res.status(404).send()
        // }

        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await user.save()
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/users/delete', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if (!user) {
        //     return res.status(404).send()
        // }
        await req.user.remove()
        res.send(req.user.getPublicProfile())
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router