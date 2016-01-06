'use strict';
// use express router module for routing
let express = require('express');
let router = express.Router();

// routes and callbacks if necessary
router.get('/', function(req, res){
  res.render('index')
});

//export the routes to the rest of the app
module.exports = router;
