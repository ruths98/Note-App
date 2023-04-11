const notes = require('express').Router();
const {v4: uuidv4 } = require('uuid');
const fs = require('fs');//idk if we need this here?
const js = require('../public/assets/js/index');

//POST route
notes.post('/', (req,res) => {
    const {notesTitle, noteText} = req.body;//noteTite and noteText are in js/index.js
    //body is the data being sent and retrieved, not necessarily html body section content!!! The content of the request.

    if (notesTitle && noteText){
        const newNote = {
            notesTitle,
            noteText,
            id:uuidv4(),
        };

        readAndAppend(newNote, './db/notes.json');//we want to add our data to the json object
        
        const response = {
            status: 'success',
            body: newNote,
        };
        
        res.json(response);
    } else {
        res.json('Error: new note not added');
    }
}
)

//GET route to retrieve notes?
notes.get('/', (req,res) =>
readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))//db.json saves the notes as JSON objects
) ;

module.exports = notes;