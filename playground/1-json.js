const fs = require('fs')

// const book = {
//     title: 'Ego is the enemy',
//     author: 'Ryan Holiday'
// }

// const bookJSON = JSON.stringify(book)
// fs.writeFileSync('1-json.json', bookJSON)

// const dataBuffer = fs.readFileSync('1-json.json')
// console.log(dataBuffer.toString())
// data = JSON.parse(dataBuffer)
// console.log(data.title)

const dataBuffer = fs.readFileSync('1-json.json')
const dataObject = JSON.parse(dataBuffer)

dataObject.name = 'Silvio'
dataObject.planet = 'Earth'
dataObject.age = 40

fs.writeFileSync('1-json.json', JSON.stringify(dataObject))