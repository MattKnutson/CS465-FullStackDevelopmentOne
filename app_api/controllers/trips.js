
const mongoose = require('mongoose');
const Trip = require('../models/travlr');  // Register the Model. //
const Model = mongoose.model('trips');


// Verify a user. //
const getUser = (req, res, callback) => {

    if (req.payload && req.payload.email) {
        User
            .findOne({ email: req.payload.email })
            .exec((err, user) => {

                if (!user) {
                    return res
                        .status(404)
                        .json({ "message": "User NOT found"});

                } else if (err) {
                    console.log(err);
                    res
                        .status(404)
                        .json(err);
                    
                }

            callback(req, res, user.name);

            });

    } else {
        return res
            .status(404)
            .json({ "message": "User not Found" });

    }

};



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

    getUser(req, res, (req, res) => {
        Trip
            .create({

            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description

            }),

            (err, trip) => {

                if (err) {
                    // Database returned NO data. //
                    return res  
                        .status(400) // Bad Request. //
                        .json(err);
        
                } else {
                    // Return the new trip. //
                    return res
                        .status(201) // Created. //
                        .json(trip);
        
                }


            }

                

    });

};


// PUT trip: Updates an existing Trip. //
// Regardless of outcome, the response must include HTML status code //
// and JSON message to the requesting client. //
const tripsUpdateTrip = async(req, res) => {

    getUser(req, res, (req, res) => {
        Trip    
            .findOneAndUpdate({ 'code': req.params.tripCode }, {

                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description

            }, { new: true })
            .then(trip => {

                if (!trip) {
                    return res
                        .status(404)
                        .send({ message: "Trip NOT found with code " + req.params.tripCode });

                }

                res.send(trip);

            }).catch(err => {

                if (err.kind === 'ObjectId') {
                    return res
                        .status(404)
                        .send({ message: "Trip NOT found with code " + req.params.tripCode });


                }

                return res
                    .status(500) // Server error. //
                    .json(err);


            });

          


    });

    


};






module.exports = {
    
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip

};