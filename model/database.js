var pgp = require("pg-promise")(/*options*/);
var config = require('../config.json')[process.env.NODE_ENV || 'dev'];

var dbConnString = "postgresql://localhost:5432/columbus";
if (process.env.NODE_ENV) {
  dbConnString = "postgres://" + config.db.username + ":" + config.db.password + "@localhost:5432/columbus";
}

var db = pgp(dbConnString);

module.exports = db;
