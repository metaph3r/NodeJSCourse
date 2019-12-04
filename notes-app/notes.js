const fs = require('fs')
const notesFile = 'notes.json'

const getNotes = function () {
    return 'Your notes ...'
}

const addNote = function (title, body) {
    const notes = loadNotes()
    const filteredNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (filteredNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added')
    } else {
        console.log('Note title already exists')
    }
}

const removeNote = function (title) {
    const notes = loadNotes()
    
    const filteredNotes = notes.filter(function (note) {
        return note.title != title
    })
    
    if (filteredNotes.length < notes.length) {
        saveNotes(filteredNotes)
        console.log('Note with title ' + title + ' removed')
    } else {
        console.log('Note with title ' + title + ' not found')
    }
}

const saveNotes = function (notes) {
    const dataNotes = JSON.stringify(notes)
    fs.writeFileSync(notesFile, dataNotes)
}

const loadNotes = function () {
    try {
        return JSON.parse(fs.readFileSync(notesFile))
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}