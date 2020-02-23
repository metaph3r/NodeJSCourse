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

const jwt = require('jsonwebtoken')

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '10 seconds' })
    console.log(token)

    setTimeout(() => {
        try {
            console.log(jwt.verify(token, 'thisismynewcourse'))
        } catch (error) {
            console.error(error)
        }
    }, 11000)
}

myFunction()