var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var routes = require('./utils/routes.js');
app.get('/users/', routes.getAllUsers);
app.get('/users/:id', routes.getUser);
app.post('/users/add', routes.addUser);
app.post('/records/add', routes.addRecord);

var server = app.listen(3001, function(){
  console.log("Listening on Port 3001");
});
