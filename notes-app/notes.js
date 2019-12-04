const fs = require('fs')
const chalk = require('chalk')

const notesFile = 'notes.json'

function listNotes() {
    const notes = loadNotes() // read notes file
    console.log(chalk.yellow("You have " + notes.length + " notes"))
    notes.forEach((note) => console.log(note.title)) // print title of all notes
}

function addNote(title, body) {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title) // search for note with same title already present

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added'))
    } else {
        console.log(chalk.bgRed('Note title already exists'))
    }
}

function removeNote(title) {
    const notes = loadNotes()

    const filteredNotes = notes.filter((note) => note.title != title)

    if (filteredNotes.length < notes.length) {
        saveNotes(filteredNotes)
        console.log(chalk.bgGreen('Note with title ' + title + ' removed'))
    } else {
        console.log(chalk.bgRed('Note with title ' + title + ' not found'))
    }
}

function readNote(title) {
    const notes = loadNotes() // load available notes
    const note = notes.find((note) => note.title === title) // search for note with given title

    if(note) {
        console.log(chalk.bold(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.bgRed("No note with title \"" + title + "\" found"))
    }
}

function saveNotes(notes) {
    const dataNotes = JSON.stringify(notes)
    fs.writeFileSync(notesFile, dataNotes)
}

function loadNotes() {
    try {
        return JSON.parse(fs.readFileSync(notesFile))
    } catch (e) {
        return []
    }
}

module.exports = {
    listNotes,
    addNote,
    removeNote,
    readNote
}