const notes = require('express').Router();
const {v4: uuidv4 } = require('uuid');
const fs = require('fs');


//GET route to retrieve notes?
notes.get('/', (req,res) => 
readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)))//do I make a new notes.json or will it generate on its own?
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