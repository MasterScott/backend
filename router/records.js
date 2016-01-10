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
      this._rawDBType= true;
      return pgp.as.format("ST_MakePoint(${lon}, ${lat})", obj.location);
    },
  };
}

function providesPolygon(obj) {
  obj.getPolygon = {
    formatDBType: function() {
      var polygon = {
        minX: parseFloat(obj.boundsArray[0]),
        minY: parseFloat(obj.boundsArray[1]),
        maxX: parseFloat(obj.boundsArray[2]),
        maxY: parseFloat(obj.boundsArray[3])
      }
      this._rawDBType = true;
      return pgp.as.format("ST_MakePolygon(ST_GeomFromText('LINESTRING(${minX} ${minY},${maxX} ${minY},${maxX} ${maxY}, ${minX} ${maxY}, ${minX} ${minY})'))", polygon)
    }
  }
}

router.get('/get', function(req, res) {
  var requestParams = {
    id: req.query.account_id,
    boundsArray: req.query.bounds.split(','),
    fromDateTime: req.query.from_datetime,
    toDateTime: req.query.to_datetime
  }
  if (requestParams.id) {
    var polygon = {
      minX: requestParams.boundsArray[0],
      minY: requestParams.boundsArray[1],
      maxX: requestParams.boundsArray[2],
      maxY: requestParams.boundsArray[3]
    };
    providesPolygon(requestParams);
    db.query("SELECT * FROM Records WHERE st_covers(${getPolygon}, location) AND user_id=${id}", requestParams)
      .then(function(data){
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
  } else {
    res.send({
      success: false,
      error: "invalid parameters"
    });
  }
});



module.exports = router;
