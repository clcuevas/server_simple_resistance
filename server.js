'use strict';

var express = require('express');
var app = express();
var petRoutes = express.Router();

/*in order for this to work, you have to export
your router as a module and pass in a router
paramater*/
require('./routes/pet_routes.js')(petRoutes);

app.get('/', function(req, res) {
  res.send('Welcome!!');
});

app.use('/api', petRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('Server is running on PORT ' + (process.env.PORT || 3000));
});