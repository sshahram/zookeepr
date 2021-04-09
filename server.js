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

app.get('/api/animals', (req, res) => {
    // console.log(__dirname);
    let results = animals;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// add the rout for a specific animal
// param route
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if(result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// post request to add data to the server

app.post('/api/animals', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();
    // req.body is where our incoming content will be 
    // console.log(req.body);
    // if any data in req.bidy is incorrect, send 400 error back
    if(!validateAnimal(req.body)) {
        res.status(400).send('The animal is not prperly formatted.');
    } else {
        // add animal to json file and animals array in this function
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

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