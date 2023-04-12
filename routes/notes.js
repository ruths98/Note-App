const notes = require('express').Router();
const {v4: uuidv4 } = require('uuid');
const fs = require('fs');
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
// const js = require('../public/assets/js/index');
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
  };

//GET route to retrieve notes?
notes.get('/', (req,res) => {
fs.readFile('./db/db.json', 'utf8', (err, data) => {res.json(JSON.parse(data))})//db.json saves the notes as JSON objects
}) ;

//POST route
notes.post('/', (req,res) => {
    const {title, text} = req.body;//noteTite and noteText are in js/index.js
    //body is the data being sent and retrieved, not necessarily html body section content!!! The content of the request.

    if (title && text){
        const newNote = {
            title,
            text,
            id:uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');//we want to add our data to the json object
        
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

// notes.delete('/:id', (req,res) => {
//   const id = req.params._id;
// note.deletenote({id}, (err, client) => {
//   if (err) {
//     throw err;
//   } else {
//     res.json(note);
//   }
// })
//   console.log("note deleted")
// })

module.exports = notes;