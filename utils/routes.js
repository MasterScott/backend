var baseUrl = "http://localhost:3000/api/";
var db = require('../model/database.js')
var express = require('express');
var router = express.Router();

router.get('/users/', function(req, res){
  db.query("SELECT * FROM users")
    .then(function(data) {
      res.send({
        success: true,
        data: data
      });
    })
    .catch(function(error) {
      res.send({
        success: false,
        error: error.message
      });
    });
});

router.get('/users/:id', function(req, res) {
  var id = req.params.id;
  if (id) {
    db.one("SELECT * FROM users WHERE id = $1", id)
      .then(function(data) {
        res.send({
          success: true,
          data: data
        });
      })
      .catch(function(error){
        res.send({
          success: false,
          error: error.message
        });
      });
  }
});

router.post('/users/add', function(req, res){
  var requestBody = req.body;
  if (requestBody.email) {
    db.one("INSERT INTO Users(email, firstname, lastname) values($1, $2, $3) returning id", [requestBody.email, requestBody.firstname, requestBody.lastname])
      .then(function(data) {
        res.send({
          success: true,
          data: {
            account_id: data.id,
          }
        });
      })
      .catch(function(error) {
        res.send({
          success: false,
          error: error.message
        });
      });
  } else {
    res.send({
      success: false,
      error: 'You need an email, firstname and lastname'
    });
  }
});

router.post('/records/add', function(req, res) {
  var requestBody = req.body;
  console.log(requestBody.location);
  if (requestBody.timestamp && requestBody.location && requestBody.account_id) {
    db.none("INSERT INTO Records(user_id, imageurl, audiourl, daterecorded, location) values($1, $2, $3, $4, 'POINT($5 $6)')",
      [requestBody.account_id, requestBody.image_url, requestBody.audio_url, requestBody.timestamp, requestBody.location.lat, requestBody.location.lon])
      .then(function(){
        res.send({
          success: true
        });
      })
      .catch(function(error){
        res.send({
          success: false,
          error: error.message
        });
      });
  } else {
    res.send({
      success: false,
      error: "invalid parameters"
    });
  }
});

module.exports = router;
