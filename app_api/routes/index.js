
const express = require('express'); // Express app. //
const router = express.Router(); // Router logic. //
const jwt = require('express-jwt');

const auth = jwt({
    
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'

}); 


// Authentication route. //
const authController = require('../controllers/authentication');

// Import the controllers used for routing. //
const tripsController = require('../controllers/trips');

// Define the route for our trips endpoint. //
router
    .route('/trips')
    .get(tripsController.tripsList) // GET Method routes tripsList. //
    .post(auth, tripsController.tripsAddTrip); // POST Method adds a trip. //


// GET Method routes tripsFindByCode (this requires a parameter). //
router  
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);


// Authentication routes to login and register. //
router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);


module.exports = router;