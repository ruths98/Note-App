const notes = require('express').Router();
const {v4: uuidv4 } = require('uuid');
const fs = require('fs');//idk if we need this here?


//GET route to retrieve notes?
notes.get('/', (req,res) => 
readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))//db.json saves the notes as JSON objects
);

//POST route
notes.post('/', (req,res) => {
    const {notesTitle, noteText} = req.body;//noteTite and noteText are in js/index.js

    if (notesTitle && noteText){
        const newNote = {
            notesTitle,
            noteText,
            //uuidv4 from line 2?
        };

        readAndAppend(newNote, './db/notes.json');//or public/notes.html?
        
        const response = {
            status: 'success',
            body: newNote,
        };
        
        res.json(response);
    } else {
        res.json('Error: new note not added');
    }
})
module.exports = notes;