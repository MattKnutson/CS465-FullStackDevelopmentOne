
// Bring in the DB connection and the Trip schema. //
const Mongoose = require('./db');
const Trip = require('./travlr');


// Read the seed data from the JSON file. //
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));


// Delete any existing data, then insert the seed data. //
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);

};


// Close the MongoDB connection and exit. //
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);

});