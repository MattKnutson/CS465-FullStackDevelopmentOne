
const mongoose = require('mongoose');
const Trip = require('../models/travlr');  // Register the Model. //
const Model = mongoose.model('trips');


// GET trips: List ALL the trips. //
// Regardless of outcome, the response must include HTML status code //
// and JSON message to the requesting client. //
const tripsList = async(req, res) => {

    const q = await Model
        .find({}) // MongoDB finds & RETURNS ALL records if no filter is used. //
        .exec();

        // Show results of the query on the console. //
        console.log(q);

    if(!q) {

        // Database returned NO data. //
        return res
            .status(404)
            .json(err);

    } else {
        
        // Return resulting trip list. //
        return res
            .status(200)
            .json(q);

    }

};



// GET tripCode: List a single trip. //
// Regardless of outcome, the response must include HTML status code //
// and JSON message to the requesting client. //
const tripsFindByCode = async(req, res) => {

    const q = await Model
        .find({'code' : req.params.tripCode}) // Return a single record from the database. //
        .exec();

        // Show results of the query on the console. //
        console.log(q);

    if(!q) {

        // Database returned NO data. //
        return res
            .status(404)
            .json(err);

    } else {
        
        // Return resulting trip. //
        return res
            .status(200)
            .json(q);

    }

};



// POST trip: Adds a new Trip. //
// Regardless of outcome, the response must include HTML status code //
// and JSON message to the requesting client. //
const tripsAddTrip = async(req, res) => {

    const newTrip = new Trip({

        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description

    });

    const q = await newTrip.save();

        if(!q) {
            // Database returned NO data. //
            return res  
                .status(400)
                .json(err);

        } else {
            // Return the new trip. //
            return res
                .status(201)
                .json(q);

        }

        console.log(q);


};


// PUT trip: Updates an existing Trip. //
// Regardless of outcome, the response must include HTML status code //
// and JSON message to the requesting client. //
const tripsUpdateTrip = async(req, res) => {

    console.log(req.params);
    console.log(req.body);

    const q = await Model
        .findOneAndUpdate(
            { 'code': req.params.tripCode },
            {

                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description

            }
        )

        .exec();

        if(!q) {
            // Database Returned NO data. //
            return res
                .status(400)
                .json(err);

        } else {
            // Return resulting trip data. //
            return res  
                .status(201)
                .json(q);

        }

        console.log(q);


};



module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip

};