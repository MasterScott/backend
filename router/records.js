var db = require('../model/database.js')
var pgp = require("pg-promise")(/*options*/);
var express = require('express');
var router = express.Router();

router.post('/add', function(req, res) {
  var requestBody = req.body;
  console.log(requestBody.location);
  if (requestBody.timestamp && requestBody.location && requestBody.account_id) {
    providesLocation(requestBody);
    db.none("INSERT INTO Records(user_id, imageurl, audiourl, daterecorded, location) values(${account_id}, ${image_url}, ${audio_url}, ${timestamp}, ${getLocation})", requestBody)
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

function providesLocation(obj) {
  obj.getLocation = {
    formatDBType: function() {
      return pgp.as.format("POINT(${lat} ${lon})", obj.location);
    }
  };
}

module.exports = router;
