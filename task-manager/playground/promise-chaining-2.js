require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5e0c672959acda2258acced9').then((result) => {
//     console.log(result)
//     return Task.countDocuments({ completed: false })
// }).then((count) => {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('5e0e395955dfc84588d4625e').then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})