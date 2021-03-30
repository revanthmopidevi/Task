const express = require('express')
require('./db/mongoose')
const User = require('./models/User')
const Task = require('./models/Task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


// Maintenance Middleware
const maintenance = false
app.use((req, res, next) => {
    if (maintenance === true) {
        res.status(503).send("Site Under Maintenance.")
    } else {
        next()
    }
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})