var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors')

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var users = require('./router/users.js');
var records = require('./router/records.js');
app.use('/api/users', users);
app.use('/api/records', records);

var server = app.listen(3001, function(){
  console.log("Listening on Port 3001");
});
