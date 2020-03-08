const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const multer = require('multer')
const upload = multer({
    dest: 'avatar',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.doc[x]*$/)) {
            return cb(new Error('Please upload a Word document'))
        } else {
            cb(undefined, true)
        }
    }
})

const auth = require('../middleware/auth')

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()

        const token = await user.generateAuthToken()

        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []

        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    res.send()
})

router.patch('/users/me', auth, async (req, res) => {
    // check of only allowed fields are updates
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates' })

    try {
        const user = req.user

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    const _id = req.params.id

    try {
        await req.user.remove()

        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router