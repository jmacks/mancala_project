'use strict';
// require and invoke express
let express = require('express');
let app = express();
// require routes file
let routes = require('./config/routes');

// have express use the following middleware
app.use('/', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use(routes);

//connect the server
const server = app.listen(process.env.PORT || 3000, function(){
  console.log('MANCALA RUNNING ON PORT 3000');
})
