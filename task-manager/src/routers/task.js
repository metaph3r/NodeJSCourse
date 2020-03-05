// system imports
const express = require('express')
const router = new express.Router()

// user defined imports
const auth = require('../middleware/auth')
const Task = require('../models/task')

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        author: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

// get all task for the current user
router.get('/tasks', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const tasks = await Task.find({ author: req.user._id })
        res.status(200).send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

// get one task by id for the current user
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, author: req.user._id })

        if (!task) {
            return res.sendStatus(404)
        }

        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    // check of only allowed fields are updates
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates' })

    try {
        const task = await Task.findOne({ _id, author: req.user._id })

        if (!task) {
            return res.status(404).send({ error: 'Task with _id ' + _id + ' not found.' })
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOneAndDelete({ _id, author: req.user._id })

        if (!task) {
            return res.status(404).send({ error: 'Task with _id ' + _id + ' not found.' })
        }

        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router