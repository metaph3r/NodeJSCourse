// system imports
const express = require('express')
require('./db/mongoose')

// routers
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('5e5eb2d9156ad01e42baba86')
    // await task.populate('author').execPopulate()
    // console.log(task.author)

    const user = await User.findById('5e5eb20c182ce21538828b9a')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()