var db = require('../model/database.js')
var pgp = require("pg-promise")(/*options*/);
var express = require('express');
var router = express.Router();

router.get('/get', function(req, res){
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

router.get('/get/id/:id', function(req, res) {
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

router.get('/get/email/:email', function(req, res) {
  var email = req.params.email;
  if (email) {
    db.one("SELECT * FROM users WHERE email=$1", email)
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


router.post('/add', function(req, res){
  var requestBody = req.body;
  requestBody.firstname = null;
  requestBody.lastname = null;
  if (requestBody.email) {
    db.one("INSERT INTO Users(email, firstname, lastname) values(${email}, ${firstname}, ${lastname}) returning id", requestBody)
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

module.exports = router;
