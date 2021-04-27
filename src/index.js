const express = require('express')
require('./db/mongoose')
const User = require('./models/User')
const Task = require('./models/Task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const maintenance = require('./middleware/maintenance')

const app = express()
const port = process.env.PORT || 3000

app.use(maintenance)
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const main = async () => {
    const task = await Task.findById('6086b3a7dbab3f4164a75d51')
    console.log(task.username)
}

main()

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})