const express = require('express');
const path = require('path');
//do i need clog?
const api = require('./routes/index'); //the path /api is the home page (index.js in routes folder)
const PORT = process.env.PORT || 3003; 
const app = express();

//cLog middleware if we need it?

//JSON parsing middleware and urlencoded form information
app.use(express.json());//went over this in tutoring video. allows us to convert strings to JSON data
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);//run the route to the index.html file when /api is added to the url query
app.use(express.static('public'));// I don't know what this means yet see line 18 server.js file

//homepage GET
app.get('/', (req,res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))
);

//notes page GET
app.get('/notes', (req,res) => 
res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//Wildcard route (direct to 404 page)
app.get('*', (req,res) =>
res.sendFile(path.join(__dirname, 'public/pages/404.html'))
);

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);