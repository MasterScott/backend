var options = {
  query: function (e) {
    if(!process.env.NODE_ENV) {
      console.log("Query:", e.query);
      if (e.ctx) {
          // this query is executing inside a task or transaction,
          if (e.ctx.isTX) {
              // this query is inside a transaction;
          } else {
              // this query is inside a task;
          }
      }
    }
  }
};

var pgp = require("pg-promise")(options);
var config = require('../config.json')[process.env.NODE_ENV || 'dev'];

var dbConnString = "postgresql://localhost:5432/columbus";
if (process.env.NODE_ENV) {
  dbConnString = "postgres://" + config.db.username + ":" + config.db.password + "@localhost:5432/columbus";
}

var db = pgp(dbConnString);

module.exports = db;
