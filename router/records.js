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
    _rawDBType: true
  };
}

function providesPolygon(obj) {
  obj.getPolygon = {
    formatDBType: function() {
      var polygon = {
        minY: parseFloat(obj.boundsArray[0]),
        minX: parseFloat(obj.boundsArray[1]),
        maxY: parseFloat(obj.boundsArray[2]),
        maxX: parseFloat(obj.boundsArray[3])
      };
      return pgp.as.format("ST_MakePolygon(ST_GeomFromText('LINESTRING(${minX} ${minY},${maxX} ${minY},${maxX} ${maxY}, ${minX} ${maxY}, ${minX} ${minY})'))", polygon)
    },
    _rawDBType: true
  }
}

router.get('/get', function(req, res) {
  var requestParams = {
    id: req.query.account_id,
    boundsArray: req.query.bounds.split(','),
    fromDateTime: (req.query.from_datetime ? req.query.from_datetime : ''),
    toDateTime: (req.query.to_datetime ? req.query.to_datetime : '')
  }
  var fromDateComparison = " AND daterecorded >= ${fromDateTime} "
  var toDateComparison = "AND daterecorded < ${toDateTime}"
  if (requestParams.id) {
    providesPolygon(requestParams);
    db.query("SELECT *, ST_X(location::geometry) as \"lng\", ST_Y(location::geometry) as \"lat\" FROM Records WHERE st_covers(${getPolygon}, location) AND user_id=${id}" + (requestParams.fromDateTime ? fromDateComparison : '') + (requestParams.toDateTime ? toDateComparison : ''), requestParams)
      .then(function(data){
        var returnData = (data.length === 0 ? null : data.map((record) => {
          return {
            user_id: record.user_id,
            image_url: record.imageurl,
            audio_url: record.audiourl,
            daterecorded: record.daterecorded,
            location: {
              lat: record.lat,
              lng: record.lng
            }
          }
        }));

        res.send({
          success: true,
          data: returnData
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
