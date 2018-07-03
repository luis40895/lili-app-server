// app.js
'use strict';

// call the packages we need
var express     = require('express');        // call express
var app         = express();                 // define our app using express
var mongoose    = require('mongoose');
mongoose.connect('mongodb://localhost:27017/liliproject'); // connect to our database
var db          = mongoose.connection;

var populatDB = require('./populateDB');
populatDB.createUsers(db);

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    next(); // make sure we go to the next routes and don't stop here
    console.log('Request ' + req.headers.origin);
    console.log('Request2 ' + req.headers.host);
});

/*router.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', config.origin);
    //res.setHeader('Access-Control-Allow-Origin', config.allowWebSite);
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});*/

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'API is running!' });
});

router.use('/users', require('./app/routes/users_router'));

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening on port ' + port);