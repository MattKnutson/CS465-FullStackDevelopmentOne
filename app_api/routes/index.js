
const express = require('express'); // Express app. //
const router = express.Router(); // Router logic. //

// Import the controllers used for routing. //
const tripsController = require('../controllers/trips');

// Define the route for our trips endpoint. //
router
    .route('/trips')
    .get(tripsController.tripsList) // GET Method routes tripsList. //
    .post(tripsController.tripsAddTrip); // POST Method adds a trip. //


// GET Method routes tripsFindByCode (this requires a parameter). //
router  
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);


module.exports = router;