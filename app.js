var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require('./utils/routes.js');
app.use('/api', routes);

var server = app.listen(3001, function(){
  console.log("Listening on Port 3001");
});
