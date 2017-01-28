# Parking App Back End
[Parking App](https://github.com/Monkman06/ParkingApp) 's server built using **NodeJS/Express**, backed by **MongoDB** database.

All hosted on Heroku. [Click here](https://parkingserver.herokuapp.com/api/markers) to see data being passed by Parking App using React Natives 'Fetch' method, and then being saved to the database.

-----------------

### Install via git clone
```bash
$ git clone git@github.com:rjf2016/ParkingServer.git
$ cd node-github
$ npm install
```
-----------------

### Dependencies
```javascript
('express');
('bodyParser');
('morgan');
('mongoose');
('bluebird')
```
-----------------

### Mongoose Connection
```javascript
// MongoDB Configuration: Uses Mlab so it can be hosted on Heroku
mongoose.connect("mongodb://parkingdb:parkingdb@ds019826.mlab.com:19826/heroku_pz7cbd0t");
var db = mongoose.connection;
```
-----------------

### Routes
```javascript
//Post
app.post("/api/markers", function(req, res) {...}
//Get
app.get("/api/markers", function(req, res) {...}
```



