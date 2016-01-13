var AWS = require('aws-sdk');
var config = require('../config.json')[process.env.NODE_ENV || 'dev']['s3'];

var credentials = new AWS.SharedIniFileCredentials({profile: 'columbus'});
AWS.config.credentials = credentials;

var s3 = new AWS.S3();

module.exports = {
  getAsset: function(key) {
    var params = {Bucket: config.bucketName, Key:key}
    var url = s3.getSignedUrl('getObject', params);
    return url;
  }
}
