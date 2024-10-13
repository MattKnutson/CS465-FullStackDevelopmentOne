
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



module.exports = {
    tripsList,
    tripsFindByCode

};