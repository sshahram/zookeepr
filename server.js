const fs = require('fs');
const path = require('path');
const express = require('express');
// requiring data
const {animals} = require('./data/animals');

// sets an environment variable for port
const PORT = process.env.PORT || 3001;

// to instantiate the server
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({extended: true}));
//parse incoming JSON data
app.use(express.json());
// instruct the server to make certain files readily available
app.use(express.static('public'));

// add routes
// app.get('/',(req, res) => {
//     res.json({message: 'Hello World!'})
// });

// route to serve index.html page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// route to serve animals.html
app.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, './public/animals.html'));
});

// route to serve zookeepers.html
app.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

// If client makes a request for a route that doesn't exist
// for example /about
// They will be redirected to the homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// to make our server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});