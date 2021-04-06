const express = require('express');
// requiring data
const {animals} = require('./data/animals');

// to instantiate the server
const app = express();

// handle filter functionality
// this function will take req.query as an argument and filter through the animals accordingly, returning the new filtered array
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    //Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if(query.personalityTraits) {
        // save personalityTraits as a dedicated array.
        // if personalityTraits is a string, place it into a new array and save.
        if(typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        //loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
            // check the trait against each animal in the filteredResults array.
            // remember, it is initially a copy of the animalsArray,
            // but here we're updating it for each trait in the .forEach() loop.
            // for each trait being targeted by the filter, the filteredResults
            // array will then contain only the entries that contain the trait,
            // so at the end we'll gace an array of animals that have every one
            // of the traits when the .forEach() loop is finished
            filteredResults = filteredResults.filter(animal => animal.personalityTraits.indexOf(trait) != -1);
        });
    }
    if(query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if(query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if(query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    // return the filtered results
    return filteredResults;
}

// add the route
app.get('/api/animals', (req, res) => {
    let results = animals;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// to make our server listen
app.listen(3001, () => {
    console.log(`API server now on port 3001!`)
});