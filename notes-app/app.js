const chalk = require('chalk')
const yargs = require('yargs')

const getNotes = require('./notes')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    handler: function () {
        console.log('Adding a new note!')
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function() {
        console.log('Removing a note!')
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List notes',
    handler: function() {
        console.log('Listing all notes!')
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read notes',
    handler: function() {
        console.log('Reading notes!')
    }
})

console.log(yargs.argv)