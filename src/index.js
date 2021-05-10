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

// const main = async () => {
//     const user = await User.findById('6098dc068160c7468488996e')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})