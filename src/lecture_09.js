const fs = require('fs')
const filename = 'lecture_09.txt'

// fs.writeFileSync(filename, 'My name is Silvio Glöckner')

fs.appendFileSync(filename, 'This is a new line\n')
