const express = require('express');
const notesRouter = require('./notes');
const app = express();

//middleware?
app.use('/notes', notesRouter);

module.exports = app;