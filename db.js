var keyv = require('keyv');
var db = new keyv("sqlite://./db.sqlite");

module.exports = db;