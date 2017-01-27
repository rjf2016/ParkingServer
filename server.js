// =====================
//    Dependencies
// =====================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require("morgan");
var mongoose = require("mongoose");

// Require 'saved' Schema
var Markers = require("./models/saved");
var request = require("request");
var Promise = require("bluebird");

mongoose.Promise = Promise;

// ===========================
//   Sets up the Express App
// ===========================

var app = express();
var PORT = Number(process.env.PORT || 3000);

// User morgan: an HTTP request logger middleware for nodeJS
app.use(logger("dev"));

// BodyParser makes it easy for our server to interpret data sent to it.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// MongoDB Configuration: Uses Mlab so it can be hosted on Heroku
mongoose.connect("mongodb://parkingdb:parkingdb@ds019826.mlab.com:19826/heroku_pz7cbd0t");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// ====================
// 		   ROUTER 
// ====================

// This is the route we will send GET requests to retrieve saved markers.
// We will call this route the moment our page gets rendered
app.get("/api/markers", function(req, res) {

		 // Uses Mongoose schema to run the search (empty conditions)
        var query = Markers.find({});
        query.exec(function(err, markers){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all markers
            res.json(markers);
        });
});


// This is the route we will send POST requests to save each marker.
app.post("/api/markers", function(req, res) {
  

  var location = [req.body.longitude, req.body.latitude]
  var numSpots = parseInt( req.body.multiplespots, 10 );
 
  var longitude = parseFloat(req.body.longitude);
  var latitude = parseFloat(req.body.latitude);

        Markers.create({
    			username: req.body.username,
    			location: [longitude, latitude],
    			multiplespots: numSpots
    			  }, function(err) {
				    if (err) {
				      console.log(err);
				    }
				    else {
				      res.send("Saved Markers");
				    }
				  });

});



app.listen(PORT, function () {
	console.log('App listening on PORT ' + PORT);
});

