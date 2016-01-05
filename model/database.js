var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgresql://localhost:5432/columbus");

module.exports = db;
